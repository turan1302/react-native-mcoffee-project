<?php

namespace App\Http\Requests\api\web\coffees;

use Illuminate\Foundation\Http\FormRequest;

class CoffeeCreateRequest extends FormRequest
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
            "cf_code"=>"required|string|max:255|unique:coffees",
            "cf_name"=>"required|string|max:255",
            "cf_desc"=>"required|string|max:500",
            "cf_roasted"=>"required|string|max:255",
            "cf_ingredients"=>"required|string|max:255",
            "cf_image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            "cf_category"=>"required|string|max:255",
        ];
    }

    public function attributes()
    {
        return [
            "cf_code" => "Kahve Kodu",
            "cf_name" => "Kahve Adı",
            "cf_desc" => "Kahve Açıklaması",
            "cf_roasted" => "Kahve Kavrulmuş İçerik",
            "cf_ingredients" => "Kahve İçindekiler",
            "cf_image" => "Kahve Resmi",
            "cf_category"=>"Kahve Kategorisi",
        ];
    }
}
