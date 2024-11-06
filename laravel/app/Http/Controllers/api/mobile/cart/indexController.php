<?php

namespace App\Http\Controllers\api\mobile\cart;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\AddressModel;
use App\Models\CartModel;
use App\Models\CoffeeModel;
use App\Models\LogsModel;
use App\Models\SettingsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $cart = CartModel::leftJoin("coffees","coffees.cf_code","=","carts.c_coffee")
            ->where([
                ["carts.c_user","=",$client->id]
            ])->orderBy("carts.c_created_at","desc")->get();

        $settings = SettingsModel::first();
        $address = AddressModel::where([
            ["add_user","=",$client->id],
            ["add_default","=",1],
        ])->first();

        return parent::success("Sepet bilgisi getirildi",[
            "cart" => $cart,
            "courier_price" => $settings->set_courier_price,
            "kdv" => $settings->set_kdv,
            "address" => $address
        ]);
    }

    public function setCart(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $data["c_user"] = $client->id;

        $coffee_control = CoffeeModel::where([
            ["cf_code", "=", $data["c_coffee"]],
            ["cf_status", "=", 1]
        ])->first();

        if ($coffee_control) {
            $cart = CartModel::where([
                ["c_user", "=", $client->id],
                ["c_coffee", "=", $data["c_coffee"]],
                ["c_size", "=", $data["c_size"]],
            ])->first();

            if ($cart) {
                $cart->c_qty += $data['c_qty'];
                $cart->c_total_price = $cart->c_qty * $cart->c_price;
                $cart->save();
            } else {
                $cart = new CartModel($data);
                $cart->save();
            }

            // ekleme işlemi
            if ($cart){

                // Log kayıt
                LogsModel::create([
                    "lg_title" => "Sepete Ekleme",
                    "lg_desc" => $client->c_name . " " . $client->c_surname . " Sepete ".$data["c_coffee"]." kodlu ürünü ekledi",
                    "lg_user" => $client->id,
                    "lg_date" => now(),
                    "lg_ip" => $request->getClientIp()
                ]);

                return parent::success("Ürün sepetinize eklendi",[],201);
            }else{
                return parent::error("Ürün sepetinize eklenirken hata oluştu");
            }

        } else {
            return parent::error("Kahve bulunamadı", [], 404);
        }
    }

    public function incrementQty(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $cart = CartModel::where([
            ["c_id","=",$data["c_id"]],
            ["c_user","=",$client->id],
        ])->first();

        if ($cart){
            // adet kontrol
            if ($cart->c_qty+$data["c_qty"]<=10){
                $result = CartModel::where([
                    ["c_id","=",$data["c_id"]],
                    ["c_user","=",$client->id],
                ])->update([
                    "c_qty" => $cart->c_qty+$data["c_qty"]
                ]);
            }else{
                $result = CartModel::where([
                    ["c_id","=",$data["c_id"]],
                    ["c_user","=",$client->id],
                ])->update([
                    "c_qty" => $cart->c_qty
                ]);
            }

            if ($result){

                LogsModel::create([
                    "lg_title" => "Sepete Adet Güncelleme",
                    "lg_desc" => $client->c_name . " " . $client->c_surname . " Sepetinde ".$cart->c_coffee." ürünün adedini artırdı",
                    "lg_user" => $client->id,
                    "lg_date" => now(),
                    "lg_ip" => $request->getClientIp()
                ]);

                return parent::success("İşlem Başarıılı",[],200);
            }else{
                return parent::error("İşlem Başarısız",[],500);
            }
        }else{
            return parent::error("Sepet verisi bulunamadı",[],404);
        }
    }

    public function decrementQty(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $cart = CartModel::where([
            ["c_id","=",$data["c_id"]],
            ["c_user","=",$client->id],
        ])->first();

        if ($cart){
            // adet kontrol
            if ($cart->c_qty-$data["c_qty"]<=0){
                $result = CartModel::where([
                    ["c_id","=",$data["c_id"]],
                    ["c_user","=",$client->id],
                ])->delete();
            }else{
                $result = CartModel::where([
                    ["c_id","=",$data["c_id"]],
                    ["c_user","=",$client->id],
                ])->update([
                    "c_qty" => $cart->c_qty-$data["c_qty"]
                ]);
            }

            if ($result){

                LogsModel::create([
                    "lg_title" => "Sepete Adet Güncelleme",
                    "lg_desc" => $client->c_name . " " . $client->c_surname . " Sepetinde ".$cart->c_coffee." ürünün adedini azalttı",
                    "lg_user" => $client->id,
                    "lg_date" => now(),
                    "lg_ip" => $request->getClientIp()
                ]);

                return parent::success("İşlem Başarıılı",[],200);
            }else{
                return parent::error("İşlem Başarısız",[],500);
            }
        }else{
            return parent::error("Sepet verisi bulunamadı",[],404);
        }
    }

    public function removeCart(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $result = CartModel::where("c_user",$client->id)->delete();

        if ($result){

            LogsModel::create([
                "lg_title" => "Sepete Silme",
                "lg_desc" => $client->c_name . " " . $client->c_surname . " Sepetini boşalttı",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);

            return parent::success("Sepet verileri silindi");
        }else{
            return parent::error("Sepet verileri silinirken hata oluştu",[],500);
        }
    }
}
