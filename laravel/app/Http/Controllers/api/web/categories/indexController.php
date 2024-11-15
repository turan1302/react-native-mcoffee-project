<?php

namespace App\Http\Controllers\api\web\categories;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\categories\CategoryCreateRequest;
use App\Http\Requests\api\web\categories\CategoryUpdateRequest;
use App\Models\CategoriesModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");

        $categories = CategoriesModel::orderBy("cfc_id", "desc")->paginate(10);
        return parent::success("Kategori listesi getirildi", $categories);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $categories = CategoriesModel::where("cfc_name", "like", "%$q%")
            ->orWhere("cfc_code", "like", "%$q%")
            ->orderBy("cfc_id", "desc")
            ->paginate(10);

        return parent::success("Kategori listesi getirildi", $categories);
    }

    public function store(CategoryCreateRequest $request)
    {
        $data = $request->except("_token");
        $create = CategoriesModel::create($data);

        if ($create){
            return parent::success("İşlem Başarılı",[],201);
        }else{
            return parent::error("İşlem Başarısız");
        }
    }

    public function edit(Request $request,$code)
    {
        $data = $request->except("_token");
        $category = CategoriesModel::where("cfc_code",$code)->first();

        if ($category){
            return parent::success("Kategori Getirildi",[
                "category" => $category
            ]);
        }else{
            return parent::error("Kategori Bulunamadı",[],404);
        }
    }

    public function update(CategoryUpdateRequest $request,$code)
    {
        $data = $request->except("_token");
        $category = CategoriesModel::where("cfc_code",$code)->first();

        if ($category){

            // kategori kodu analizi
           if ($data["cfc_code"]!=$category->cfc_code){
               $control = CategoriesModel::where("cfc_code",$data["cfc_code"])->first();

               if ($control){
                   return parent::error("Aynı koda ait olan kategori mevcut",[],422);
               }
           }

           $result = CategoriesModel::where("cfc_id",$category->cfc_id)->update($data);

           if ($result){
               return parent::success("İşlem başarılı");
           }else{
               return parent::error("İşlem başarısız");
           }
        }else{
            return parent::error("Kategori Bulunamadı",[],404);
        }
    }

    public function setStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $category = CategoriesModel::where("cfc_id", $id)->first();

        if ($category) {
            $result = CategoriesModel::where("cfc_id", $id)->update([
                "cfc_status" => !$category->cfc_status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kategori Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $category = CategoriesModel::where("cfc_id", $id)->first();

        if ($category) {
            $result = CategoriesModel::where("cfc_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kategori Bulunamadı", [], 404);
        }
    }
}
