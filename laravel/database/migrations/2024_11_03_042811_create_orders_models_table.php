<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('ord_id');
            $table->integer('ord_hesap')->nullable();
            $table->string('ord_no')->nullable();
            $table->string('ord_type')->comment("0 bireysel, 1 kurumsal")->nullable();
            $table->string('ord_company')->nullable();
            $table->string('ord_company_vd')->nullable();
            $table->string('ord_company_vd_no')->nullable();
            $table->string('ord_name')->nullable();
            $table->string('ord_surname')->nullable();
            $table->string('ord_email')->nullable();
            $table->string('ord_city')->nullable();
            $table->string('ord_district')->nullable();
            $table->text('ord_address')->nullable();
            $table->integer('ord_payment_type')->nullable()->comment("0 sana gelsin, 1 gel al");
            $table->tinyInteger('ord_status')->default(0)->nullable()->comment('siparisin odenme durumunu temsil eder. 0 bekliyor, 1 ödendi, 2 iptal edildi');
            $table->tinyInteger('ord_delivery_status')->nullable()->default(0)->comment('siparis teslimat durum kısmı burada olacak. 0 bekliyor, 1 teslim edildi, 2 iptal edildi');
            $table->string('ord_z_date')->nullable();
            $table->text('ord_note')->nullable();
            $table->string('ord_ip')->nullable()->comment('siparis veren ip adresi');
            $table->softDeletes();
            $table->timestamp('ord_created_at')->nullable();
            $table->timestamp('ord_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
