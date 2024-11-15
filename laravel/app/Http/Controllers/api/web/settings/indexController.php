<?php

namespace App\Http\Controllers\api\web\settings;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\web\settings\SettingsUpdateRequest;
use App\Models\SettingsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class indexController extends BaseController
{
    private $uploadFolder;
    public function __construct()
    {
        $this->uploadFolder =  "settings/";
    }

    public function index(Request $request)
    {
        $settings = SettingsModel::first();
        return parent::success("Ayarlar getirildi",[
            "settings" => $settings
        ]);
    }

    public function update(SettingsUpdateRequest $request)
    {
        $data = $request->except("_token");
        $result = SettingsModel::first();

        $data["set_icon"] = $result->set_icon;
        $data["set_favicon"] = $result->set_favicon;

        // icon kontrolü
        if ($request->hasFile("set_icon")){
            if ($result->set_icon!="" && File::exists("storage/".$result->set_icon)){
                File::delete("storage/".$result->set_icon);
            }

            $file = $request->file("set_icon");
            $name = Str::slug($result->set_title." icon")."-".uniqid().".".$file->getClientOriginalExtension();

            $data["set_icon"]=$file->storeAs($this->uploadFolder.$name);
        }

        // favicon kontrolü
        if ($request->hasFile("set_favicon")){
            if ($result->set_favicon!="" && File::exists("storage/".$result->set_favicon)){
                File::delete("storage/".$result->set_favicon);
            }

            $file = $request->file("set_favicon");
            $name = Str::slug($result->set_title." favicon")."-".uniqid().".".$file->getClientOriginalExtension();

            $data["set_favicon"]=$file->storeAs($this->uploadFolder.$name);
        }

        $result->update($data);

        if ($result){
            return parent::success("İşlem Başarılı");
        }else{
            return parent::error("İşlem Başarısız");
        }
    }
}
