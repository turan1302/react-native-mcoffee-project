<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AddressModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "address";

    protected $primaryKey = "add_id";
    protected $guarded = [];

    public const CREATED_AT = "add_created_at";
    public const UPDATED_AT = "add_updated_at";
}
