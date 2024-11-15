<?php

namespace App\Http\Controllers\api\web\logs;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\LogsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $logs = LogsModel::leftJoin("clients","clients.id","=","logs.lg_user")
            ->orderBy("logs.lg_id","desc")
            ->paginate(10);

        return parent::success("Loglar getirildi",$logs);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";
        $start = $data["startDate"] ?? "";
        $endDate = $data["endDate"] ?? "";

        $logs = LogsModel::leftJoin("clients","clients.id","=","logs.lg_user");

        if ($aranan=="" && $start=="" && $endDate==""){
            $logs = LogsModel::leftJoin("clients","clients.id","=","logs.lg_user");
        }

        if ($aranan!=""){
            $logs->where("logs.lg_title","like","%$aranan%");
        }

        if ($start!=""){
            $logs->where("logs.lg_date",">=",$start);

        }

        if ($endDate!=""){
            $logs->where("logs.lg_date","<=",$endDate);
        }
        
        $result=$logs->orderBy("logs.lg_id","desc")->paginate(10);

        return parent::success("Loglar getirildi",$result);

    }
}
