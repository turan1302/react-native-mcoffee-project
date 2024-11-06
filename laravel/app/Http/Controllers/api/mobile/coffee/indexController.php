<?php

namespace App\Http\Controllers\api\mobile\coffee;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CoffeeModel;
use App\Models\PricesModel;
use App\Models\RateModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function get_coffee(Request $request, $coffeeCode)
    {
        $client = $request->user();

        $coffee = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
            ->leftJoin("rates", function ($join) {
                $join->on("rates.rt_coffee", "=", "coffees.cf_code")
                    ->whereNull("rates.deleted_at");
            })
            ->leftJoin("favourites", function ($join) use ($client) {
                $join->on("favourites.fv_coffee", "=", "coffees.cf_code")
                    ->where("favourites.fv_user", $client->id)
                    ->whereNull("favourites.deleted_at");
            })
            ->leftJoin("categories", "categories.cfc_code", "=", "coffees.cf_category")
            ->where("coffees.cf_code", $coffeeCode)
            ->where("prices.cfp_default", 1)
            ->select(
                "coffees.cf_code",
                "coffees.cf_image",
                "coffees.cf_id",
                "coffees.cf_name",
                "coffees.cf_desc",
                "prices.cfp_size",
                "prices.cfp_price",
                "categories.cfc_id as category_id",
                "categories.cfc_code as category_code",
                "categories.cfc_name as category_name",
                DB::raw("ROUND(AVG(rates.rt_star), 1) as cf_rates"), // AVG burada kullanılacak
                DB::raw("COUNT(rates.rt_id) as rate_count"),
                DB::raw("CASE WHEN COUNT(favourites.fv_id) > 0 THEN true ELSE false END as cf_favourite")
            )
            ->groupBy("coffees.cf_code", "coffees.cf_id", "coffees.cf_name", "prices.cfp_size", "prices.cfp_price", "categories.cfc_id", "categories.cfc_code", "categories.cfc_name")
            ->havingRaw("COUNT(rates.rt_id) > 0") // En az bir değerlendirme olmalı
            ->first();

        if ($coffee){

            // kahve boylarını getirelim
            $coffee_size = PricesModel::where("cfp_coffee",$coffeeCode)->get();

            // kullanıcının kahveye verdiği oyu çekelim
            $rate = RateModel::where([
                ["rt_coffee","=",$coffeeCode],
                ["rt_user","=",$client->id]
            ])->first()->rt_star ?? 0;

            return parent::success("Kahve bilgileri getirildi",[
                "coffee" => $coffee,
                "coffee_size"=>$coffee_size,
                "rate" => $rate
            ]);
        }else{
            return parent::error("Kahve bulunamadı",[],404);
        }
    }

    public function set_rate(Request $request,$coffeeCode)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $coffee = CoffeeModel::where("cf_code",$coffeeCode)->first();

        if ($coffee){
            if ($data["rt_star"]!=0){
                RateModel::updateOrCreate(
                    [
                        "rt_coffee" => $coffeeCode,
                        "rt_user" => $client->id
                    ],
                    [
                        "rt_star" => $data["rt_star"]
                    ]
                );
            }else{
                RateModel::where([
                    ["rt_coffee","=",$coffeeCode],
                    ["rt_user","=",$client->id],
                ])->delete();
            }
        }else{
            return parent::error("Kahve bulunamadı",[],404);
        }
    }
}
