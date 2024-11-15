<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartModel extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $appends = ['sugar'];

    public function getSugarAttribute()
    {
        switch ($this->ord_status) {
            case 0:
                return 'Şekersiz';
            case 1:
                return 'Az Şekerli';
            case 2:
                return 'Orta Şekerli';
            default:
                return 'Bilinmiyor';  // İstenmeyen bir değer durumunda
        }
    }


    protected $table = "carts";
    protected $primaryKey = "c_id";
    protected $guarded = [];

    public const CREATED_AT = "c_created_at";
    public const UPDATED_AT = "c_updated_at";
}
