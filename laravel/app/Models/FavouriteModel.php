<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FavouriteModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "favourites";
    protected $guarded = [];
    protected $primaryKey = "fv_id";

    public const CREATED_AT = "fv_created_at";
    public const UPDATED_AT = "fv_updated_at";
}
