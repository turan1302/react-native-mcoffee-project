<?php

namespace App\Http\Controllers\api\web\carts;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CartModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");

        $carts = CartModel::leftJoin("coffees","coffees.cf_code","=","carts.c_coffee")
            ->leftJoin("clients","clients.id","=","carts.c_user")
            ->orderBy("carts.c_id","desc")
            ->paginate(10);

        return parent::success("Sepet verileri getirildi",$carts);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";

        $carts = CartModel::leftJoin("coffees","coffees.cf_code","=","carts.c_coffee")
            ->leftJoin("clients","clients.id","=","carts.c_user")
            ->where("coffees.cf_name","like","%$aranan%")
            ->orWhere("carts.c_coffee","like","%$aranan%")
            ->orderBy("carts.c_id","desc")
            ->paginate(10);

        return parent::success("Sepet verileri getirildi",$carts);
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $carts = CartModel::where("c_id", $id)->first();

        if ($carts) {
            $result = CartModel::where("c_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Sepet verisi Bulunamadı", [], 404);
        }
    }
}
