<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriesModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "categories";
    protected $guarded = [];
    protected $primaryKey = "cfc_id";

    public const CREATED_AT = "cfc_created_at";
    public const UPDATED_AT = "cfc_updated_at";
}
