<?php

namespace App\Http\Controllers\api\mobile\order\cometoyou;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\AddressModel;
use App\Models\CartModel;
use App\Models\LogsModel;
use App\Models\SettingsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {

        $data = $request->except("_token");
        $client = $request->user();

        $ord_no = uniqid();

        $address = AddressModel::where([
            ["add_user","=",$client->id],
            ["add_default","=",1],
        ])->first();

        $settings = SettingsModel::first();

        $data = [
            "ord_client" => $client->id,
            "ord_company" => $address->add_title,
            "ord_company_vd" => $address->add_tax_office,
            "ord_company_vd_no" => $address->add_tax_no,
            "ord_name" => $client->c_name,
            "ord_surname" => $client->c_surname,
            "ord_email" => $client->email,
            "ord_city" => $address->add_city,
            "ord_district" => $address->add_district,
            "ord_address" => $address->add_desc,
            "ord_status" => 0,
            "ord_delivery_status" => 0,
            "ord_z_date" => date("Y-m-d"),
            "ord_note" => $data["ord_note"] ?? "",
            "ord_ip" => $request->getClientIp()
        ];

        $ord_type = $address->add_type==BIREYSEL ? BIREYSEL : KURUMSAL;

        $add_order = add_customer_order($data,$ord_no,SANA_GELSIN,$ord_type);

        if ($add_order){
            $basket = CartModel::where([
                ["c_user","=",$client->id]
            ])->get();

            $add_order_product = add_customer_order_product($basket,$ord_no);
            $add_order_bill = add_customer_bill($data,$ord_no,KURUMSAL,SANA_GELSIN,$settings->set_courier_price);

            CartModel::where([
                ["c_user","=",$client->id]
            ])->delete();


            // Log kayıt
            LogsModel::create([
                "lg_title" => "Sana Gelsin Siparişi",
                "lg_desc" => $client->c_name . " " . $client->c_surname . " Sana Gelsin Siparişi Oluşturdu",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);


            return parent::success("Müşteri siparişi ekleme işlemi başarılı",[],201);
        }else{
            return parent::error("Müşteri sipariş verilirken hata oluştu. Lütfen daha sonra tekrar deneyiniz...");
        }

    }
}
