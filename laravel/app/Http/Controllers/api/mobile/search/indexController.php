<?php

namespace App\Http\Controllers\api\mobile\search;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CoffeeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $result = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
            ->leftJoin("rates", function ($join) {
                $join->on("rates.rt_coffee", "=", "coffees.cf_code")
                    ->whereNull("rates.deleted_at");
            })
            ->leftJoin("categories", "categories.cfc_code", "=", "coffees.cf_category")
            ->leftJoin("favourites", function ($join) use ($client) {
                $join->on("favourites.fv_coffee", "=", "coffees.cf_code");
            })
            ->where([
                ["coffees.cf_name","like","%".$data["key"]."%"],
                ["prices.cfp_default","=",1]
            ])
            ->select(
                "coffees.cf_code",
                "coffees.cf_image",
                "coffees.cf_id",
                "coffees.cf_name",
                "prices.cfp_size",
                "prices.cfp_price",
                "categories.cfc_id as category_id",
                "categories.cfc_code as category_code",
                "categories.cfc_name as category_name",
                DB::raw("ROUND(AVG(rates.rt_star), 1) as cf_rates"),
                DB::raw("MAX(CASE WHEN favourites.fv_id IS NOT NULL THEN 1 ELSE 0 END) as cf_favourite")            )
            ->groupBy("coffees.cf_code", "coffees.cf_id", "coffees.cf_name", "prices.cfp_size", "prices.cfp_price", "categories.cfc_id", "categories.cfc_code", "categories.cfc_name")
            ->havingRaw("COUNT(rates.rt_id) > 0")
            ->get();

        return parent::success("Datalar Getirildi", [
            "search" => $result
        ]);
    }
}
