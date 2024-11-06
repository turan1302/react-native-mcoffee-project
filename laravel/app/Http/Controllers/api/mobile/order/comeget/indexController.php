<?php

namespace App\Http\Controllers\api\mobile\order\comeget;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CartModel;
use App\Models\LogsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $client = $request->user();

        $ord_no = uniqid();

        $data = [
            "ord_client" => $client->id,
            "ord_company" => "",
            "ord_company_vd" => "",
            "ord_company_vd_no" => "",
            "ord_name" => $client->c_name,
            "ord_surname" => $client->c_surname,
            "ord_email" => $client->email,
            "ord_city" => "",
            "ord_district" => "",
            "ord_address" => "",
            "ord_status" => 0,
            "ord_delivery_status" => 0,
            "ord_z_date" => date("Y-m-d"),
            "ord_ip" => $request->getClientIp()
        ];

        $add_order = add_customer_order($data,$ord_no,GEL_AL,BIREYSEL);

        if ($add_order){
            $basket = CartModel::where([
                ["c_user","=",$client->id]
            ])->get();

            $add_order_product = add_customer_order_product($basket,$ord_no);
            $add_order_bill = add_customer_bill($data,$ord_no,BIREYSEL);
            CartModel::where([
                ["c_user","=",$client->id]
            ])->delete();

            // Log kayıt
            LogsModel::create([
                "lg_title" => "Gel Al Siparişi",
                "lg_desc" => $client->c_name . " " . $client->c_surname . " Gel Al Siparişi Oluşturdu",
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
