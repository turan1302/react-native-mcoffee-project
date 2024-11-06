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
        Schema::create('bills', function (Blueprint $table) {
            $table->id('bl_id');
            $table->string('bl_order')->nullable()->comment('Siparis No ile Aynı Olacak');
            $table->string('bl_type')->nullable()->comment("0 ise bireysel 1 ise kurumsal");
            $table->string('bl_company')->nullable();
            $table->string('bl_company_vd')->nullable();
            $table->string('bl_company_vd_no')->nullable();
            $table->string('bl_name')->nullable();
            $table->string('bl_surname')->nullable();
            $table->string('bl_email')->nullable();
            $table->string('bl_city')->nullable();
            $table->string('bl_district')->nullable();
            $table->text('bl_address')->nullable();
            $table->decimal('bl_price',10,2)->nullable()->comment('fatura tutar');
            $table->integer('bl_kdv')->nullable()->comment('kdv oran');
            $table->decimal('bl_courier_price')->nullable()->comment('fatura kargo tutar');
            $table->decimal('bl_total_price')->nullable()->comment('fatura toplam tutar');
            $table->softDeletes();
            $table->timestamp('bl_created_at')->nullable();
            $table->timestamp('bl_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
