<?php

namespace App\Http\Controllers\api\web\address;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\AddressModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $data = $request->except("_token");
        $address = AddressModel::leftJoin("clients", "clients.id", "=", "address.add_user")
            ->orderBy("add_id", "desc")
            ->paginate(10);

        return parent::success("Adresler getirildi", $address);
    }

    public function search(Request $request)
    {
        $data = $request->except("_token");
        $aranan = $data["search"] ?? "";

        $address = AddressModel::leftJoin("clients", "clients.id", "=", "address.add_user")
            ->where("address.add_city", "like", "%$aranan%")
            ->orWhere("address.add_district", "like", "%$aranan%")
            ->orWhere("clients.c_name", "like", "%$aranan%")
            ->orWhere("clients.c_surname", "like", "%$aranan%")
            ->orderBy("address.add_id", "desc")
            ->paginate(10);

        return parent::success("Adresler getirildi", $address);
    }

    public function setDefaultStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $address = AddressModel::where("add_id", $id)->first();

        if ($address) {

            $result = false;

            DB::transaction(function () use ($address, $id, &$result) {
                AddressModel::where([
                    ["add_user", "=", $address->add_user]
                ])
                    ->update(['add_default' => 0]);

                $result = AddressModel::where([
                    ["add_id", "=", $id],
                    ["add_user", "=", $address->add_user]
                ])
                    ->update(['add_default' => 1]);
            });


            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Kahve Bulunamadı", [], 404);
        }
    }

    public function setCorporateStatus(Request $request, $id)
    {
        $data = $request->except("_token");
        $address = AddressModel::where("add_id", $id)->first();

        if ($address) {
            $result = AddressModel::where("add_id", $id)->update([
                "add_type" => !$address->add_type
            ]);

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Adres Bulunamadı", [], 404);
        }
    }

    public function delete(Request $request, $id)
    {
        $data = $request->except("_token");
        $address = AddressModel::where("add_id", $id)->first();

        if ($address) {
            $result = AddressModel::where("add_id", $id)->delete();

            if ($result) {
                return parent::success("İşlem Başarılı", [], 200);
            } else {
                return parent::error("İşlem Başarısız", [], 500);
            }
        } else {
            return parent::error("Adres Bulunamadı", [], 404);
        }
    }
}
