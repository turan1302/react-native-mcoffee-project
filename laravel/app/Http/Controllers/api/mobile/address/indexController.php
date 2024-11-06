<?php

namespace App\Http\Controllers\api\mobile\address;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\mobile\address\CreateAddressRequest;
use App\Models\AddressModel;
use App\Models\LogsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $address = AddressModel::where("add_user", $client->id)->orderBy("add_id", "desc")->get();

        // Log kayıt
        LogsModel::create([
            "lg_title" => "Adresler Giriş",
            "lg_desc" => $client->c_name . " " . $client->c_surname . " Adreslerine  Giriş Yaptı",
            "lg_user" => $client->id,
            "lg_date" => now(),
            "lg_ip" => $request->getClientIp()
        ]);

        return parent::success("Müşteri adresleri getirildi", [
            "address" => $address
        ]);
    }

    public function store(CreateAddressRequest $request)
    {
        $client = $request->user();
        $data = $request->except("_token");
        $data["add_user"] = $client->id;

        $create = AddressModel::create($data);

        if ($create) {

            // Log kayıt
            LogsModel::create([
                "lg_title" => "Adres Ekleme",
                "lg_desc" => $client->c_name . " " . $client->c_surname . " Yeni Adres Ekledi",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);

            return parent::success("Adres Kayıt İşlemi Başarılı", [], 201);
        } else {
            return parent::error("Adres Kayıt İşlemi Başarısız");
        }
    }

    public function edit(Request $request, $id)
    {
        $client = $request->user();
        $address = AddressModel::where([
            ["add_id", "=", $id],
            ["add_user", "=", $client->id]
        ])->first();

        if ($address) {
            return parent::success("Adres getirildi", [
                "address" => $address
            ]);
        } else {
            return parent::error("Adres bulunamadı", [], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $client = $request->user();
        $data = $request->except("_token");
        $address = AddressModel::where([
            ["add_id", "=", $id],
            ["add_user", "=", $client->id]
        ])->first();

        if ($address) {
            // kurumsal ise
            if ($data["add_type"] == KURUMSAL) {
                // vergi no kontrolü
                if ($data["add_tax_no"] !== $address->add_tax_no) {
                    $count = AddressModel::where("add_tax_no", $data["add_tax_no"])->first();

                    if ($count) {
                        return parent::error("Bu vergi adresine ait kayıt var", [], 422);
                    }
                }
            } else {
                // bireysel ise

                $data["add_tax_office"] = null;
                $data["add_tax_no"] = null;
            }

            $update = AddressModel::where([
                ["add_user","=",$client->id],
                ["add_id","=",$id],
            ])->update($data);

            if ($update){

                // Log kayıt
                LogsModel::create([
                    "lg_title" => "Adres Güncelleme",
                    "lg_desc" => $client->c_name . " " . $client->c_surname ." ".$address->add_title." Adresini Güncelledi",
                    "lg_user" => $client->id,
                    "lg_date" => now(),
                    "lg_ip" => $request->getClientIp()
                ]);

                return parent::success("Adres güncelleme işlemi başarılı");
            }else{
                return parent::error("Adres güncelleme işlemi başarısız");
            }

        } else {
            return parent::error("Adres bulunamadı", [], 404);
        }
    }


    public function delete(Request $request, $id)
    {
        $client = $request->user();
        $address = AddressModel::where([
            ["add_id", "=", $id],
            ["add_user", "=", $client->id],
        ])->delete();

        if ($address) {

            // Log kayıt
            LogsModel::create([
                "lg_title" => "Adres Güncelleme",
                "lg_desc" => $client->c_name . " " . $client->c_surname ." Adresini Sildi",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);

            return parent::success("Adres silindi");
        } else {
            return parent::error("Adres silinirken hata oluştu");
        }
    }

    public function default(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");
        $id = $data["add_id"];

        DB::transaction(function () use ($request, $client, $id) {
            AddressModel::where("add_user", $client->id)->update(["add_default" => 0]);

            AddressModel::where([
                ["add_user", $client->id],
                ["add_id", $id]
            ])->update(["add_default" => 1]);


            // Log kayıt
            LogsModel::create([
                "lg_title" => "Adres Varsayılana Alma",
                "lg_desc" => $client->c_name . " " . $client->c_surname ." Adresini Varsayılana Çevirdi",
                "lg_user" => $client->id,
                "lg_date" => now(),
                "lg_ip" => $request->getClientIp()
            ]);
        });
    }
}
