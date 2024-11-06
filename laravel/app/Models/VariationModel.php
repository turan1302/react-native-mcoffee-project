<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VariationModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "variations";
    protected $guarded = [];
    protected $primaryKey = "vy_id";

    public const CREATED_AT = "vy_created_at";
    public const UPDATED_AT = "vy_updated_at";
}
