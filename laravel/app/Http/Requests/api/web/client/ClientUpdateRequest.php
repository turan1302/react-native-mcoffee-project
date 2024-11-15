<?php

namespace App\Http\Requests\api\web\client;

use Illuminate\Foundation\Http\FormRequest;

class ClientUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "c_name" => "required|string|max:100",
            "c_surname" => "required|string|max:100",
            "email" => "required|string|email",
            "password" => "nullable|string|min:8|max:16|confirmed",
        ];
    }

    public function attributes()
    {
        return [
            "c_name" => "Kullanıcı Adı",
            "c_surname" => "Kullanıcı Soyadı",
            "email" => "Kulllanıcı E-Mail",
            "password" => "Kullanıcı Şifre"
        ];
    }
}
