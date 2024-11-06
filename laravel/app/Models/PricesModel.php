<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PricesModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "prices";
    protected $guarded = [];
    protected $primaryKey = "cfp_id";

    public const CREATED_AT = "cfp_created_at";
    public const UPDATED_AT = "cfp_updated_at";
}
