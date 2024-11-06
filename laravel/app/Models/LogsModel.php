<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LogsModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = "lg_id";
    protected $table = "logs";
    protected $guarded = [];

    public const CREATED_AT = "lg_created_at";
    public const UPDATED_AT = "lg_updated_at";
}
