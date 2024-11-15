<?php

namespace App\Http\Controllers\api\web\coffees;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\categories\CategoryCreateRequest;
use App\Http\Requests\api\web\coffees\CoffeeCreateRequest;
use App\Http\Requests\api\web\coffees\CoffeeUpdateRequest;
use App\Models\CategoriesModel;
use App\Models\CoffeeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class indexController extends BaseController
{
    private $uploadFolder;

    public function __construct()
    {
        $this->uploadFolder = "coffeeImage/";
    }

    public function index(Request $request)
    {
        $data = $request->except("_token");

        $coffees = CoffeeModel::leftJoin("categories", "categories.cfc_code", "=", "coffees.cf_category")
            ->orderBy("coffees.cf_id", "desc")
            ->paginate(10);
        return parent::success("Kahve listesi getirildi", $coffees);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $coffees = CoffeeModel::leftJoin("categories", "categories.cfc_code", "=", "coffees.cf_category")
            ->where("coffees.cf_name", "like", "%$q%")
            ->orWhere("coffees.cf_code", "like", "%$q%")
            ->orderBy("coffees.cf_id", "desc")
            ->paginate(10);

        return parent::success("Kahve listesi getirildi", $coffees);
    }

    // kayıt kısmında olacak kısım
    public function create(Request $request)
    {
        $data = $request->except("_token");
        $categories = CategoriesModel::where([
            ["cfc_status", "=", 1]
        ])->orderBy("cfc_name", "asc")->get();

        return parent::success("Kahve Kayıt Sayfası", [
            "categories" => $categories
        ]);
    }

    public function store(CoffeeCreateRequest $request)
    {
        $data = $request->except("_token");
        $data["cf_image"] = null;

        // resim kontrolü
        if ($request->hasFile("cf_image")) {
            $file = $request->file("cf_image");
            $name = Str::slug($data["cf_name"]) . "-" . uniqid() . "." . $file->getClientOriginalExtension();

            $data["cf_image"] = $file->storeAs($this->uploadFolder . $name);
        }

        $create = CoffeeModel::create($data);

        if ($create) {
            return parent::success("İşlem Başarılı", [], 201);
        } else {
            return parent::error("İşlem Başarısız");
        }
    }

    public function edit(Request $request, $code)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_code", $code)->first();

        if ($coffee) {
            $categories = CategoriesModel::where([
                ["cfc_status", "=", 1]
            ])->orderBy("cfc_name", "asc")->get();

            return parent::success("Kahve Getirildi", [
                "coffee" => $coffee,
                "categories" => $categories
            ]);
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }

    public function update(CoffeeUpdateRequest $request, $code)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_code", $code)->first();

        if ($coffee) {

            // kategori kodu analizi
            if ($data["cf_code"] != $coffee->cf_code) {
                $control = CoffeeModel::where("cf_code", $data["cf_code"])->first();

                if ($control) {
                    return parent::error("Aynı koda ait olan kahve mevcut", [], 422);
                }
            }

            $data["cf_image"] = $coffee->cf_image;

            // resim kontrol
            if ($request->hasFile("cf_image")) {
                if ($coffee->cf_image != "" && File::exists("storage/" . $coffee->cf_image)) {
                    File::delete("storage/" . $coffee->cf_image);
                }

                $file = $request->file("cf_image");
                $name = Str::slug($data["cf_name"]) . "-" . uniqid() . "." . $file->getClientOriginalExtension();

                $data["cf_image"] = $file->storeAs($this->uploadFolder . $name);
            }

            $result = CoffeeModel::where("cf_id", $coffee->cf_id)->update($data);

            if ($result) {
                return parent::success("İşlem başarılı");
            } else {
                return parent::error("İşlem başarısız");
            }
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }

    public function setStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_id", $id)->first();

        if ($coffee) {
            $result = CoffeeModel::where("cf_id", $id)->update([
                "cf_status" => !$coffee->cf_status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }

    public function setCampaign(Request $request, $id)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_id", $id)->first();

        if ($coffee) {
            $result = CoffeeModel::where("cf_id", $id)->update([
                "cf_campaign" => !$coffee->cf_campaign
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request, $id)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_id", $id)->first();

        if ($coffee) {
            // resim kontrol
            if ($coffee->cf_image != "" && File::exists("storage/" . $coffee->cf_image)) {
                File::delete("storage/" . $coffee->cf_image);
            }

            $result = CoffeeModel::where("cf_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }
}
