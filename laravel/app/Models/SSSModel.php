<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SSSModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "sss";
    protected $primaryKey = "sss_id";
    protected $guarded = [];

    public const CREATED_AT = "sss_created_at";
    public const UPDATED_AT = "sss_updated_at";
}
