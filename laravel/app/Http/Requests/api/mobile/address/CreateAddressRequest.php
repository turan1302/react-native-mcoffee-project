<?php

namespace App\Http\Requests\api\mobile\address;

use Illuminate\Foundation\Http\FormRequest;

class CreateAddressRequest extends FormRequest
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
            "add_city" => "required|string|max:255",
            "add_district" => "required|string|max:255",
            "add_title" => "required|string|max:255",
            "add_desc" => "required|string|max:800",
            "add_tax_no" => "string|nullable|max:255|unique:address",
            "add_tax_office" => "string|nullable|max:255",
            "add_type" => "integer|min:0|max:1",
        ];
    }

    public function attributes()
    {
        return [
            "add_city" => "Şehir",
            "add_district" => "İlçe",
            "add_title" => "Başlık",
            "add_desc" => "Açık Adres",
            "add_tax_no" => "Vergi Numarası",
            "add_tax_office" => "Vergi Dairesi",
            "add_type" => "Müşteri Tipi",
        ];
    }
}
