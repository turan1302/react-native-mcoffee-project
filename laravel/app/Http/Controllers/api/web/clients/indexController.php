<?php

namespace App\Http\Controllers\api\web\clients;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\client\ClientRegisterRequest;
use App\Http\Requests\api\web\client\ClientUpdateRequest;
use App\Models\ClientModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $clients = ClientModel::orderBy("id", "desc")->paginate(10);

        return parent::success("Kullanıcı listesi getirildi", $clients);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $q = $data["search"];
        $prices = ClientModel::where("c_name", "like", "%$q%")
            ->orWhere("c_surname", "like", "%$q%")
            ->orWhere("email", "like", "%$q%")
            ->orderBy("id", "desc")
            ->paginate(10);

        return parent::success("Kullanıcı listesi getirildi", $prices);
    }

    public function store(ClientRegisterRequest $request)
    {
        $data = $request->except("_token","password_confirmation");
        $create = ClientModel::create($data);

        if ($create){
            return parent::success("İşlem Başarılı",[],201);
        }else{
            return parent::error("İşlem Başarısız");
        }
    }

    public function edit(Request $request, $id)
    {
        $data = $request->except("_token");
        $client = ClientModel::where("id", $id)->first();

        if ($client) {
            return parent::success("Kullanıcı Getirildi", [
                "client" => $client,
            ]);
        } else {
            return parent::error("Kullanıcı Bulunamadı", [], 404);
        }
    }

    public function update(ClientUpdateRequest $request,$id)
    {
        $data = $request->except("_token","password_confirmation");
        $client = ClientModel::where("id",$id)->first();

        if ($client){
            if ($data["email"] !== $client->email) {
                $count = ClientModel::where("email", $data["email"])->first();

                if ($count) {
                    return parent::error("Aynı E-Mail Adresine Ait Kullanıcı Var", [], 422);
                }
            }

            $update = ClientModel::where("id", $client->id)->update([
                "c_name" => $data['c_name'],
                "c_surname" => $data['c_surname'],
                "email" => $data['email'],
                "password" => ($data['password'] == "") ? $client->password : Hash::make($data["password"])
            ]);

            if ($update){
                return parent::success("İşlem Başarılı");
            }else{
                return parent::error("İşlem Başarısız");
            }
        }else{
            return parent::error("Kullanıcı bulunamadı",[],404);
        }
    }

    public function setStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $client = ClientModel::where("id", $id)->first();

        if ($client) {
            $result = ClientModel::where("id", $id)->update([
                "status" => !$client->status
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request,$id)
    {
        $data = $request->except("_token");
        $client = ClientModel::where("id", $id)->first();

        if ($client) {
            $result = ClientModel::where("id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kullanıcı Bulunamadı", [], 404);
        }
    }
}
