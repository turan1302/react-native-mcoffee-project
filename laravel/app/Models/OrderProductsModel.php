<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProductsModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $appends = ["sugar_status"];

    protected $table = "order_products";
    protected $guarded = [];
    protected $primaryKey = "orp_id";

    public const CREATED_AT = "orp_created_at";
    public const UPDATED_AT = "orp_updated_at";

    public function getSugarStatusAttribute()
    {
        switch ($this->orp_sugar) {
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
}
