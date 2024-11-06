<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SettingsModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "settings";
    protected $guarded = [];
    protected $primaryKey = "set_id";

    public const CREATED_AT = "set_created_at";
    public const UPDATED_AT = "set_updated_at";
}
