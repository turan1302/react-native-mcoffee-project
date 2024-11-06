<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdersModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $appends = ['payment_status'];

    public function getPaymentStatusAttribute()
    {
        switch ($this->ord_status) {
            case 0:
                return 'Bekliyor';
            case 1:
                return 'Ödendi';
            case 2:
                return 'İptal Edildi';
            default:
                return 'Bilinmiyor';  // İstenmeyen bir değer durumunda
        }
    }

    protected $table = "orders";
    protected $guarded = [];
    protected $primaryKey = "ord_id";

    public const CREATED_AT = "ord_created_at";
    public const UPDATED_AT = "ord_updated_at";

}
