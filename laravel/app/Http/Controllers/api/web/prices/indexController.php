<?php

namespace App\Http\Controllers\api\web\prices;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CoffeeModel;
use App\Models\PricesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $prices = PricesModel::leftJoin("coffees","coffees.cf_code","=","prices.cfp_coffee")
            ->orderBy("prices.cfp_id","desc")
            ->paginate(10);

        return parent::success("Fiyatlar Getirildi",$prices);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $prices = PricesModel::leftJoin("coffees","coffees.cf_code","=","prices.cfp_coffee")
            ->orWhere("prices.cfp_coffee", "like", "%$q%")
            ->orWhere("coffees.cf_name", "like", "%$q%")
            ->orderBy("prices.cfp_id", "desc")
            ->paginate(10);

        return parent::success("Fiyat listesi getirildi", $prices);
    }

    public function create(Request $request)
    {
        $data = $request->except("_token");
        $coffees = CoffeeModel::where([
            ["cf_status", "=", 1]
        ])->orderBy("cf_name", "asc")->get();

        return parent::success("Fiyat Ekleme Sayfası", [
            "coffees" => $coffees
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->except("_token");

        $coffee = CoffeeModel::where("cf_code",$data["cfp_coffee"])->first();

        if ($coffee){
            $result = PricesModel::create($data);

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
        $price = PricesModel::where("cfp_id", $id)->first();

        if ($price) {
            $coffees = CoffeeModel::where([
                ["cf_status", "=", 1]
            ])->orderBy("cf_name", "asc")->get();

            return parent::success("Fiyat Getirildi", [
                "price" => $price,
                "coffees" => $coffees
            ]);
        } else {
            return parent::error("Fiyat Bulunamadı", [], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->except("_token");
        $coffee = CoffeeModel::where("cf_code", $data["cfp_coffee"])->first();

        if ($coffee) {

            $result = PricesModel::where("cfp_id", $id)->update($data);

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
        $price = PricesModel::where("cfp_id", $id)->first();

        if ($price) {
            $result = PricesModel::where("cfp_id", $id)->update([
                "cfp_status" => !$price->cfp_status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Fiyat Bulunamadı", [], 404);
        }
    }

    public function setDefaultStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $prices = PricesModel::where("cfp_id", $id)->first();

        if ($prices) {

            $result = false;

            DB::transaction(function () use ($prices, $id, &$result) {
                PricesModel::where([
                    ["cfp_coffee", "=", $prices->cfp_coffee]
                ])
                    ->update(['cfp_default' => 0]);

                $result = PricesModel::where([
                    ["cfp_id", "=", $id],
                    ["cfp_coffee", "=", $prices->cfp_coffee]
                ])
                    ->update(['cfp_default' => 1]);
            });


            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Fiyat Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $prices = PricesModel::where("cfp_id", $id)->first();

        if ($prices) {
            $result = PricesModel::where("cfp_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Fiyat Bulunamadı", [], 404);
        }
    }
}
