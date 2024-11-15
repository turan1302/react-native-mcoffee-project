<?php

namespace App\Http\Requests\api\web\sss;

use Illuminate\Foundation\Http\FormRequest;

class SSSUpdateRequest extends FormRequest
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
            "sss_title"=>"required|string|max:255",
            "sss_desc" => "required|string|max:500"
        ];
    }

    public function attributes()
    {
        return [
            "sss_title"=>"SSS Başlık",
            "sss_desc" => "SSS Açıklama"
        ];
    }
}
