<?php

namespace App\Http\Requests\api\web\variations;

use Illuminate\Foundation\Http\FormRequest;

class VariationUpdateRequest extends FormRequest
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
            "vy_coffee"=>"required|string|max:255",
            "vy_ingredients"=>"required|string|max:500",
        ];
    }

    public function attributes()
    {
        return [
            "vy_coffee"=>"Kahve Adı",
            "vy_ingredients"=>"Kahve Varyasyon",
        ];
    }
}
