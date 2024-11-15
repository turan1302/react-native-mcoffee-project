<?php

namespace App\Http\Controllers\api\web\favourites;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\FavouriteModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $favourites = FavouriteModel::leftJoin("coffees","coffees.cf_code","=","favourites.fv_coffee")
            ->leftJoin("clients","clients.id","=","favourites.fv_user")
            ->orderBy("favourites.fv_id","desc")
            ->paginate(10);

        return parent::success("Favoriler getirildi",$favourites);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";

        $favourites = FavouriteModel::leftJoin("coffees","coffees.cf_code","=","favourites.fv_coffee")
            ->leftJoin("clients","clients.id","=","favourites.fv_user")
            ->where("coffees.cf_name","like","%$aranan%")
            ->orWhere("favourites.fv_coffee","like","%$aranan%")
            ->orderBy("favourites.fv_id","desc")
            ->paginate(10);

        return parent::success("Favoriler getirildi",$favourites);
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $favourite = FavouriteModel::where("fv_id", $id)->first();

        if ($favourite) {
            $result = FavouriteModel::where("fv_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Favori Bulunamadı", [], 404);
        }
    }
}
