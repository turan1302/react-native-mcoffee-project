<?php

namespace App\Http\Requests\api\web\settings;

use Illuminate\Foundation\Http\FormRequest;

class SettingsUpdateRequest extends FormRequest
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
            "set_icon" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            "set_favicon" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ];
    }

    public function attributes()
    {
        return [
            "set_icon" => "Site Icon",
            "set_favicon" => "Site Favicon"
        ];
    }
}
