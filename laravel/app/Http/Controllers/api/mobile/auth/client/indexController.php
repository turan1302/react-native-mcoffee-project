<?php

namespace App\Http\Controllers\api\mobile\auth\client;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\mobile\auth\client\RegisterRequest;
use App\Models\ClientModel;
use App\Models\ClientSettingsModel;
use App\Models\LogsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function login(Request $request)
    {
        $data = $request->except("_token");

        $user = ClientModel::where([
            ["email","=",$data['email']],
            ["status","=",1]
        ])->first();

        if ($user && Hash::check($data['password'], $user->password)) {
            $token = $user->createToken('coffee')->accessToken;

            // log kayıt
            LogsModel::create([
                "lg_title" => "Giriş",
                "lg_desc" => $user->c_name . " " . $user->c_surname . " Kullanıcısı sisteme giriş yaptı",
                "lg_user" => $user->id,
                "lg_date" => date("Y-m-d"),
                "lg_ip" => $request->getClientIp()
            ]);

            return parent::success("Kullanıcı Giriş İşlemi Başarılı", [
                "id" => $user->id,
                "c_name" => $user->c_name,
                "c_surname" => $user->c_surname,
                "email" => $user->email,
                "token_type" => "Bearer",
                "access_token" => $token
            ]);

        } else {
            return parent::error("Kullanıcı Bilgileri Hatalı", [], 401);
        }
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->except("_token", "password_confirmation");

        $user = ClientModel::create($data);

        if ($user) {
            // log kayıt
            LogsModel::create([
                "lg_title" => "Kayıt",
                "lg_desc" => $user->c_name . " " . $user->c_surname . " Kullanıcısı sisteme kayıt oldu",
                "lg_user" => $user->id,
                "lg_date" => date("Y-m-d"),
                "lg_ip" => $request->getClientIp()
            ]);

            // kullanıcı ayarlarını gerçekleştirelim
            ClientSettingsModel::updateOrCreate([
                "cs_client" => $user->id
            ], [
                "cs_notify" => 1,
                "cs_email" => 1,
                "cs_sms" => 1
            ]);


            return parent::success("Kullanıcı Oluşturuldu. Bilgilerinizle Giriş Yapabilirsiniz", [
                "user" => $user
            ], 201);
        } else {
            return parent::error("Kullanıcı Oluşturulurken Hata Oluştu", [], 500);
        }
    }

    public function profile(Request $request)
    {
        $user = $request->user();

        return parent::success("Kullanıcı Bilgileri Getirildi", [
            "user" => $user,
        ]);
    }

    public function update_profile(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token", "password_confirmation");

        if ($data["email"] !== $client->email) {
            $count = ClientModel::where("email", $data["email"])->first();

            if ($count) {
                return parent::error("Aynı E-Mail Adresine Ait Kullanıcı Var", [], 422);
            }
        }

        $update = ClientModel::where("id", $client->id)->update([
            "c_name" => $data['c_name'],
            "c_surname" => $data['c_surname'],
            "email" => $data['email'],
            "password" => ($data['password'] == "") ? $client->password : Hash::make($data["password"])
        ]);

        if ($update) {
            $token = $client->createToken("coffee")->accessToken;

            // log kayıt
            LogsModel::create([
                "lg_title" => "Profil Güncelleme",
                "lg_desc" => $data['c_name'] . " " . $data['c_surname'] . " Kullanıcısı bilgilerini güncelledi",
                "lg_user" => $client->id,
                "lg_date" => date("Y-m-d"),
                "lg_ip" => $request->getClientIp()
            ]);

            return response()->json([
                "success" => true,
                "title" => "Başarılı",
                "message" => "Bilgileriniz Başarıyla Güncellendi",
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "c_name" => $client->c_name,
                    "c_surname" => $client->c_surname,
                    "email" => $client->email,
                    "token_type" => "Bearer",
                    "access_token" => $token
                ]
            ]);
        } else {
            return response()->json([
                "success" => false,
                "title" => "Hata",
                "message" => "İşlem Başarısız"
            ]);
        }
    }

    public function check(Request $request)
    {
        $client = $request->user();

        if ($client) {
            $token = $client->createToken("coffee")->accessToken;

            return response()->json([
                "success" => true,
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "c_name" => $client->c_name,
                    "c_surname" => $client->c_surname,
                    "email" => $client->email,
                    "token_type" => "Bearer",
                    "access_token" => $token
                ]
            ]);
        } else {
            return response()->json([
                "success" => false,
                "isLoggedIn" => false
            ]);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $token = $user->token();
        $token->revoke();

        // log kayıt
        LogsModel::create([
            "lg_title" => "Çıkış",
            "lg_desc" => $user->c_name . " " . $user->c_surname . " Kullanıcısı çıkış yaptı",
            "lg_user" => $user->id,
            "lg_date" => date("Y-m-d"),
            "lg_ip" => $request->getClientIp()
        ]);

        return parent::success("Çıkış Gerçekleştirildi", [], 200);
    }
}
