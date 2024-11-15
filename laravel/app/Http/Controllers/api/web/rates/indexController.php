<?php

namespace App\Http\Controllers\api\web\rates;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\RateModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $rates = RateModel::leftJoin("coffees","coffees.cf_code","=","rates.rt_coffee")
            ->leftJoin("clients","clients.id","=","rates.rt_user")
            ->orderBy("rates.rt_id","desc")
            ->paginate(10);

        return parent::success("Oylamalar getirildi",$rates);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";

        $rates = RateModel::leftJoin("coffees","coffees.cf_code","=","rates.rt_coffee")
            ->leftJoin("clients","clients.id","=","rates.rt_user")
            ->where("coffees.cf_name","like","%$aranan%")
            ->orWhere("rates.rt_coffee","like","%$aranan%")
            ->orderBy("rates.rt_id","desc")
            ->paginate(10);

        return parent::success("Oylamalar getirildi",$rates);
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $rate = RateModel::where("rt_id", $id)->first();

        if ($rate) {
            $result = RateModel::where("rt_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Oy Bulunamadı", [], 404);
        }
    }
}
