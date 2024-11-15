<?php

namespace App\Http\Controllers\api\web\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\BillsModel;
use App\Models\ClientModel;
use App\Models\LogsModel;
use App\Models\OrdersModel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");

        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $today = Carbon::today();

        $thisMontEarn = BillsModel::whereBetween('bl_created_at', [$startOfMonth, $endOfMonth])
            ->sum('bl_total_price');

        $todayEarn = BillsModel::whereDate('bl_created_at', $today)
            ->sum('bl_total_price');

        $clients = ClientModel::count();

        $pendingOrders =  OrdersModel::where("ord_delivery_status",0)->count();

        $lastOrders = OrdersModel::leftJoin("clients","clients.id","=","orders.ord_client")
            ->orderBy("ord_id","desc")
            ->limit(5)
            ->get();

        $lastClients = ClientModel::orderBy("id","desc")->limit(5)->get();

        $lastLogs = LogsModel::leftJoin("clients","clients.id","=","logs.lg_user")
            ->orderBy("logs.lg_id","desc")
            ->limit(5)
            ->get();

        return parent::success("Raporlar getirildi",[
            "thisMontEarn"=>$thisMontEarn,
            "todayEarn"=>$todayEarn,
            "clients" => $clients,
            "pendingOrders" => $pendingOrders,
            "lastOrders"=>$lastOrders,
            "lastClients" => $lastClients,
            "lastLogs"=>$lastLogs
        ]);
    }
}
