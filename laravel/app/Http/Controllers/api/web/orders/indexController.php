<?php

namespace App\Http\Controllers\api\web\orders;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\BillsModel;
use App\Models\OrderProductsModel;
use App\Models\OrdersModel;
use App\Models\SettingsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("token");
        $orders = OrdersModel::leftJoin("clients","clients.id","=","orders.ord_client")
            ->orderBy("ord_id","desc")
            ->paginate(10);

        return parent::success("Siparişler Getirildi",$orders);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";
        $start = $data["startDate"] ?? "";
        $endDate = $data["endDate"] ?? "";

        $orders = OrdersModel::leftJoin("clients","clients.id","=","orders.ord_client");

        if ($aranan=="" && $start=="" && $endDate==""){
            $orders = OrdersModel::leftJoin("clients","clients.id","=","orders.ord_client");
        }

        if ($aranan!=""){
            $orders->where("orders.ord_no","like","%$aranan%");
        }

        if ($start!=""){
            $orders->where("orders.ord_z_date",">=",$start);
        }

        if ($endDate!=""){
            $orders->where("orders.ord_z_date","<=",$endDate);
        }

        $result=$orders->orderBy("orders.ord_id","desc")->paginate(10);

        return parent::success("Siparişler getirildi",$result);

    }

    public function bills(Request $request,$code)
    {
        $data = $request->except("_token");
        $order = OrdersModel::where("ord_no",$code)->first();

        if ($order){
            $bills = BillsModel::where("bl_order",$code)->first();
            $order_products = OrderProductsModel::leftJoin("coffees","coffees.cf_code","=","order_products.orp_coffee")->where("order_products.orp_order",$code)->get();
            $settings = SettingsModel::first();

            return parent::success("Fatura Getirildi",[
                "order"=>$order,
                "order_products"=>$order_products,
                "settings"=>$settings,
                "bills" => $bills
            ],200);
        }else{
            return parent::error("Sipariş bulunamadı",[],404);
        }
    }

    public function update(Request $request,$code)
    {
        $data = $request->except("_token");
        $order = OrdersModel::where("ord_no",$code)->first();

        if ($order){
            $result = OrdersModel::where("ord_no",$code)->update($data);

            if ($result){
                return parent::success("İşlem Başarılı");
            }else{
                return parent::success("İşlem Başarısız",[],500);
            }
        }else{
            return parent::error("Sipariş bulunamadı",[],404);
        }
    }
}
