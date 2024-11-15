<?php

namespace App\Http\Controllers\api\web\clientSettings;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ClientSettingsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $clientSettings = ClientSettingsModel::join("clients", "clients.id", "=", "client_settings.cs_client")
            ->orderBy("client_settings.cs_id", "desc")
            ->paginate(10);

        return parent::success("Kullanıcı ayarları getirildi", $clientSettings);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";

        $result = ClientSettingsModel::join("clients", "clients.id", "=", "client_settings.cs_client")
            ->where("clients.c_name", "like", "%$aranan%")
            ->orWhere("clients.c_surname", "like", "%$aranan%")
            ->orderBy("client_settings.cs_id", "desc")
            ->paginate(10);

        return parent::success("Kullanıcı ayarları getirildi", $result);
    }

    public function setNotifyStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $clientSettings = ClientSettingsModel::where("cs_id", $id)->first();

        if ($clientSettings) {
            $result = ClientSettingsModel::where("cs_id", $id)->update([
                "cs_notify" => !$clientSettings->cs_notify
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Ayarı Bulunamadı", [], 404);
        }
    }

    public function setEmailStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $clientSettings = ClientSettingsModel::where("cs_id", $id)->first();

        if ($clientSettings) {
            $result = ClientSettingsModel::where("cs_id", $id)->update([
                "cs_email" => !$clientSettings->cs_email
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Ayarı Bulunamadı", [], 404);
        }
    }

    public function setSmsStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $clientSettings = ClientSettingsModel::where("cs_id", $id)->first();

        if ($clientSettings) {
            $result = ClientSettingsModel::where("cs_id", $id)->update([
                "cs_sms" => !$clientSettings->cs_sms
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Ayarı Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request, $id)
    {
        $data = $request->except("_token");
        $clientSettings = ClientSettingsModel::where("cs_id", $id)->first();

        if ($clientSettings) {
            $result = ClientSettingsModel::where("cs_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Ayarı Bulunamadı", [], 404);
        }
    }
}
