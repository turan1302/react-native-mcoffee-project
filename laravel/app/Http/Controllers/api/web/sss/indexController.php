<?php

namespace App\Http\Controllers\api\web\sss;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\sss\SSSCreateRequest;
use App\Http\Requests\api\web\sss\SSSUpdateRequest;
use App\Models\SSSModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");

        $sss = SSSModel::orderBy("sss_id", "desc")->paginate(10);
        return parent::success("SSS listesi getirildi", $sss);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $sss = SSSModel::where("sss_title", "like", "%$q%")
            ->orderBy("sss_id", "desc")
            ->paginate(10);

        return parent::success("SSS listesi getirildi", $sss);
    }

    public function store(SSSCreateRequest $request)
    {
        $data = $request->except("_token");
        $create = SSSModel::create($data);

        if ($create){
            return parent::success("İşlem Başarılı",[],201);
        }else{
            return parent::error("İşlem Başarısız");
        }
    }

    public function edit(Request $request,$id)
    {
        $data = $request->except("_token");
        $sss = SSSModel::where("sss_id",$id)->first();

        if ($sss){
            return parent::success("SSS Getirildi",[
                "sss" => $sss
            ]);
        }else{
            return parent::error("SSS Bulunamadı",[],404);
        }
    }

    public function update(SSSUpdateRequest $request,$id)
    {
        $data = $request->except("_token");
        $sss = SSSModel::where("sss_id",$id)->first();

        if ($sss){
            $result = SSSModel::where("sss_id",$sss->sss_id)->update($data);

            if ($result){
                return parent::success("İşlem başarılı");
            }else{
                return parent::error("İşlem başarısız");
            }
        }else{
            return parent::error("SSS Bulunamadı",[],404);
        }
    }

    public function setStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $sss = SSSModel::where("sss_id", $id)->first();

        if ($sss) {
            $result = SSSModel::where("sss_id", $id)->update([
                "sss_status" => !$sss->sss_status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("SSS Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $sss = SSSModel::where("sss_id", $id)->first();

        if ($sss) {
            $result = SSSModel::where("sss_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("SSS Bulunamadı", [], 404);
        }
    }
}
