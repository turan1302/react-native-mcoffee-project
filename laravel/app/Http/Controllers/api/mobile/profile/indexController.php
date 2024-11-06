<?php

namespace App\Http\Controllers\api\mobile\profile;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\LogsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $logs = LogsModel::where("lg_user",$client->id)->orderBy("lg_id","desc")->limit(3)->get();

        return parent::success("Log kayıtları getirildi",[
            "logs" => $logs
        ]);
    }
}
