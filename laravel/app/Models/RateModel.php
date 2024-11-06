<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RateModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "rates";
    protected $guarded = [];
    protected $primaryKey = "rt_id";

    public const CREATED_AT = "rt_created_at";
    public const UPDATED_AT = "rt_updated_at";
}
