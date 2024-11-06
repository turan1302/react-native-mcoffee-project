<?php

namespace App\Http\Controllers\api\mobile\lastOrders;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\BillsModel;
use App\Models\LogsModel;
use App\Models\OrderProductsModel;
use App\Models\OrdersModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");


        $bills = OrdersModel::select("bills.bl_total_price", "orders.ord_no", "orders.ord_status")
            ->leftJoin("bills", "orders.ord_no", "=", "bills.bl_order")
            ->where([
                ["orders.ord_client", "=", $client->id]
            ])
            ->orderByDesc("orders.ord_created_at")
            ->get()
            ->map(function ($item) use ($client) {
                $item["products"] = OrderProductsModel::leftJoin("coffees","coffees.cf_code","=","order_products.orp_coffee")->where([
                    ["orp_order", "=", $item->ord_no]
                ])->get();

                $item["payment_status"] = $item->payment_status;

                return $item;
            });


        // Log kayıt
        LogsModel::create([
            "lg_title" => "Siparişleri İnceleme",
            "lg_desc" => $client->c_name . " " . $client->c_surname ." Son Siparişlerini İnceledi",
            "lg_user" => $client->id,
            "lg_date" => now(),
            "lg_ip" => $request->getClientIp()
        ]);

        return parent::success("Kullanıcı siparişleri getirildi", [
            "orders" => $bills
        ]);
    }
}
