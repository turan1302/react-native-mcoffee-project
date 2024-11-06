<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BillsModel extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $table = "bills";
    protected $primaryKey = "bl_id";
    protected $guarded = [];

    public const CREATED_AT = "bl_created_at";
    public const UPDATED_AT = "bl_updated_at";
}
