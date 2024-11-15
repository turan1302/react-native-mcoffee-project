<?php

namespace App\Http\Controllers\api\web\variations;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\variations\VariationCreateRequest;
use App\Http\Requests\api\web\variations\VariationUpdateRequest;
use App\Models\CoffeeModel;
use App\Models\VariationModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $variations = VariationModel::leftJoin("coffees","coffees.cf_code","=","variations.vy_coffee")
            ->orderBy("variations.vy_id","desc")
            ->paginate(10);

        return parent::success("Varyasyonlar Getirildi",$variations);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $variations = VariationModel::leftJoin("coffees","coffees.cf_code","=","variations.vy_coffee")
            ->orWhere("variations.vy_coffee", "like", "%$q%")
            ->orWhere("coffees.cf_name", "like", "%$q%")
            ->orderBy("variations.vy_id", "desc")
            ->paginate(10);

        return parent::success("Varyasyonlar getirildi", $variations);
    }

    public function create(Request $request)
    {
        $data = $request->except("_token");
        $coffees = CoffeeModel::where([
            ["cf_status", "=", 1]
        ])->orderBy("cf_name", "asc")->get();

        return parent::success("Varyasyon Ekleme Sayfası", [
            "coffees" => $coffees
        ]);
    }

    public function store(VariationCreateRequest $request)
    {
        $data = $request->except("_token");

        $coffee = CoffeeModel::where("cf_code",$data["vy_coffee"])->first();

        if ($coffee){
            $result = VariationModel::create($data);

            if ($result){
                return parent::success("İşlem Başarılı",[],201);
            }else{
                return parent::error("İşlem Başarısız",[],500);
            }
        }else{
            return parent::error("Kahve Bulunamadı",[],404);
        }
    }

    public function edit(Request $request, $id)
    {
        $data = $request->except("_token");
        $variation = VariationModel::where("vy_id", $id)->first();

        if ($variation) {
            $coffees = CoffeeModel::where([
                ["cf_status", "=", 1]
            ])->orderBy("cf_name", "asc")->get();

            return parent::success("Varyasyon Getirildi", [
                "variation" => $variation,
                "coffees" => $coffees
            ]);
        } else {
            return parent::error("Varyasyon Bulunamadı", [], 404);
        }
    }

    public function update(VariationUpdateRequest $request, $id)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_code", $data["vy_coffee"])->first();

        if ($coffee) {
            $result = VariationModel::where("vy_id", $id)->update($data);

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
        $variation = VariationModel::where("vy_id", $id)->first();

        if ($variation) {
            $result = VariationModel::where("vy_id", $id)->update([
                "vy_status" => !$variation->vy_status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Varyasyon Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $variation = VariationModel::where("vy_id", $id)->first();

        if ($variation) {
            $result = VariationModel::where("vy_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Varyasyon Bulunamadı", [], 404);
        }
    }
}
