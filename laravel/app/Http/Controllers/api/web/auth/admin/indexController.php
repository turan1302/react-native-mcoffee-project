<?php

namespace App\Http\Controllers\api\web\auth\admin;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\auth\admin\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function login(Request $request)
    {
        $data = $request->except("_token");

        $user = User::where("email", $data['email'])->first();

        if ($user && Hash::check($data['password'], $user->password)) {
            $token = $user->createToken('coffeeAdmin')->accessToken;

            return parent::success("Admin Giriş İşlemi Başarılı", [
                "id" => $user->id,
                "name" => $user->name,
                "surname" => $user->surname,
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

        $user = User::create($data);

        if ($user) {

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
        $user = $request->user();
        $data = $request->except("_token", "password_confirmation");

        if ($data["email"] !== $user->email) {
            $count = User::where("email", $data["email"])->first();

            if ($count) {
                return parent::error("Aynı E-Mail Adresine Ait Kullanıcı Var", [], 422);
            }
        }

        $update = User::where("id", $user->id)->update([
            "name" => $data['name'],
            "surname" => $data['surname'],
            "email" => $data['email'],
            "password" => ($data['password'] == "") ? $user->password : Hash::make($data["password"])
        ]);

        if ($update) {
            $token = $user->createToken("coffeeAdmin")->accessToken;

            return response()->json([
                "success" => true,
                "title" => "Başarılı",
                "message" => "Bilgileriniz Başarıyla Güncellendi",
                "isLoggedIn" => true,
                "data" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "surname" => $user->surname,
                    "email" => $user->email,
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
        $user = $request->user();

        if ($user) {
            $token = $user->createToken("coffeeAdmin")->accessToken;

            return response()->json([
                "success" => true,
                "isLoggedIn" => true,
                "data" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "surname" => $user->surname,
                    "email" => $user->email,
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

        return parent::success("Çıkış Gerçekleştirildi", [], 200);
    }
}
