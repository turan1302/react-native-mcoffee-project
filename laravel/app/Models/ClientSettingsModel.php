<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientSettingsModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "client_settings";
    protected $guarded = [];
    protected $primaryKey = "cs_id";

    public const CREATED_AT = "cs_created_at";
    public const UPDATED_AT = "cs_updated_at";
}
