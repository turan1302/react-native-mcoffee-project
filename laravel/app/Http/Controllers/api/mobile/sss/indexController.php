<?php

namespace App\Http\Controllers\api\mobile\sss;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\SSSModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $sss = SSSModel::where("sss_status",1)->orderBy("sss_order","asc")->get();

        return parent::success("Sıkça Sorulan Sorular Getirildi",[
            "sss" => $sss
        ]);
    }
}
