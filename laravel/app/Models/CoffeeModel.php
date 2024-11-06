<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoffeeModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "coffees";
    protected $guarded = [];
    protected $primaryKey = "cf_id";

    public const CREATED_AT = "cf_created_at";
    public const UPDATED_AT = "cf_updated_at";
}
