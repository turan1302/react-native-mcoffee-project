<?php

namespace App\Http\Controllers\api\mobile\clientSettings;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ClientSettingsModel;
use App\Models\LogsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $client_settings = ClientSettingsModel::where("cs_client",$client->id)->first();

        return parent::success("Kullanıcı ayarları getirildi",$client_settings);
    }

    public function change(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        DB::transaction(function () use ($client, $data, $request) {
            ClientSettingsModel::updateOrCreate([
                "cs_client" => $client->id
            ], [
                $data["settingName"] => $data["value"]
            ]);

            // Log kaydı oluşturma
            LogsModel::create([
                "lg_title" => "Kullanıcı Ayarları Değiştirme",
                "lg_desc" => $client->c_name . " " . $client->c_surname . " Ayarlarını Güncelledi",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);
        });
    }
}
