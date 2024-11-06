<?php

namespace App\Http\Controllers\api\mobile\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CategoriesModel;
use App\Models\CoffeeModel;
use App\Models\FavouriteModel;
use App\Models\RateModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();

        $categories = CategoriesModel::orderBy("cfc_name", "asc")->get();

        $campaigns = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
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
            ->where("coffees.cf_campaign", 1)
            ->where("prices.cfp_default", 1)
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
                DB::raw("CASE WHEN COUNT(favourites.fv_id) > 0 THEN true ELSE false END as cf_favourite")
            )
            ->groupBy("coffees.cf_code", "coffees.cf_id", "coffees.cf_name", "prices.cfp_size", "prices.cfp_price", "categories.cfc_id", "categories.cfc_code", "categories.cfc_name")
            ->havingRaw("COUNT(rates.rt_id) > 0") // En az bir değerlendirme olmalı
            ->havingRaw("ROUND(AVG(rates.rt_star), 1) IS NOT NULL") // Oy ortalaması null olmasın
            ->get();

        $most_votes = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
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
            ->where("coffees.cf_campaign", 1)
            ->where("prices.cfp_default", 1)
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
                DB::raw("MAX(CASE WHEN favourites.fv_id IS NOT NULL THEN 1 ELSE 0 END) as cf_favourite")
            )
            ->groupBy("coffees.cf_code", "coffees.cf_id", "coffees.cf_name", "prices.cfp_size", "prices.cfp_price", "categories.cfc_id", "categories.cfc_code", "categories.cfc_name")
            ->havingRaw("COUNT(rates.rt_id) > 0") // En az bir değerlendirme olmalı
            ->havingRaw("ROUND(AVG(rates.rt_star), 1) >= 4") // Oy ortalaması 4 ve üzeri olmalı
            ->get();

        $all = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
            ->leftJoin("rates", function ($join) {
                $join->on("rates.rt_coffee", "=", "coffees.cf_code")
                    ->whereNull("rates.deleted_at");
            })
            ->leftJoin("categories", "categories.cfc_code", "=", "coffees.cf_category")
            ->leftJoin("favourites", function ($join) use ($client) {
                $join->on("favourites.fv_coffee", "=", "coffees.cf_code");
            })
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
            ->havingRaw("COUNT(rates.rt_id) > 0") // En az bir değerlendirme olmalı
            ->get();

        return parent::success("Datalar Getirildi", [
            "categories" => $categories,
            "campaigns" => $campaigns,
            "most_votes" => $most_votes,
            "all" => $all
        ]);
    }
}
