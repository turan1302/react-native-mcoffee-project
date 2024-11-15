<?php

namespace App\Http\Requests\api\web\categories;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            "cfc_code"=>"required|string|max:255",
            "cfc_name"=>"required|string|max:255"
        ];
    }

    public function attributes()
    {
        return [
            "cfc_code"=>"Kategori Kodu",
            "cfc_name"=>"Kategori Adı"
        ];
    }
}
