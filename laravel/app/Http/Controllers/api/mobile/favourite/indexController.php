<?php

namespace App\Http\Controllers\api\mobile\favourite;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CoffeeModel;
use App\Models\FavouriteModel;
use App\Models\LogsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{

    public function index(Request $request)
    {
        $client = $request->user();

        $coffees = CoffeeModel::leftJoin("prices", "prices.cfp_coffee", "=", "coffees.cf_code")
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
            ->havingRaw("COUNT(favourites.fv_id) > 0") // cf_favourite 0 olan kayıtlar hariç
            ->get();

        return parent::success("Favori kahveler getirildi",[
            "favourites" => $coffees
        ]);
    }
    public function set_favourite(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $control = FavouriteModel::where([
            ["fv_user","=",$client->id],
            ["fv_coffee","=",$data['fv_coffee']],
        ])->first();

        if ($control){
            DB::transaction(function () use ($client, $data, $request) {
                FavouriteModel::where([
                    ["fv_user", "=", $client->id],
                    ["fv_coffee", "=", $data['fv_coffee']],
                ])->delete();

                // Log kayıt
                LogsModel::create([
                    "lg_title" => "Favoriden Çıkarma",
                    "lg_desc" => $client->c_name . " " . $client->c_surname . " Favorisinden kahve çıkardı",
                    "lg_user" => $client->id,
                    "lg_date" => now(),
                    "lg_ip" => $request->getClientIp()
                ]);
            });
        }else{
            DB::transaction(function () use ($client, $data, $request) {
                FavouriteModel::create([
                    "fv_user" => $client->id,
                    "fv_coffee" => $data['fv_coffee']
                ]);

                // Log kayıt
                LogsModel::create([
                    "lg_title" => "Favoriye Ekleme",
                    "lg_desc" => $client->c_name . " " . $client->c_surname . " Favorisine kahve ekledi",
                    "lg_user" => $client->id,
                    "lg_date" => now(), // Laravel'ın now() fonksiyonu ile tarih
                    "lg_ip" => $request->getClientIp()
                ]);
            });
        }
    }
}
