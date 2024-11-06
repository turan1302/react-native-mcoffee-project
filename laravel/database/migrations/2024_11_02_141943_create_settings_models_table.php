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
        Schema::create('settings', function (Blueprint $table) {
            $table->id('set_id');
            $table->string('set_url')->nullable();
            $table->string('set_title')->nullable();
            $table->string('set_desc')->nullable();
            $table->string('set_keyw')->nullable();
            $table->string('set_slogan')->nullable();
            $table->string('set_tel')->nullable()->comment('site tel');
            $table->text('set_address')->nullable()->comment('site adresi');
            $table->string('set_map')->nullable();
            $table->tinyInteger('set_map_status')->default(1)->comment("1 ise aktif 0 ise pasif")->nullable();
            $table->string('set_mail')->nullable();
            $table->tinyInteger('set_status')->default(1)->comment("1 ise aktif 0 ise pasif")->nullable();
            $table->string('set_icon')->nullable();
            $table->string('set_favicon')->nullable();
            $table->string('set_google_verify_code')->nullable();
            $table->string('set_yandex_verify_code')->nullable();
            $table->string("set_bing_verify_code")->nullable();
            $table->mediumText('set_analiytcs_code')->nullable();
            $table->decimal('set_courier_price',10,2)->default(25)->nullable()->comment('kurye ücreti')->nullable();
            $table->softDeletes();
            $table->timestamp('set_created_at')->nullable();
            $table->timestamp('set_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
