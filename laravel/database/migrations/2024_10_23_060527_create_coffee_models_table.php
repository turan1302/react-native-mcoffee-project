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
        Schema::create('coffees', function (Blueprint $table) {
            $table->id('cf_id');
            $table->string('cf_code')->nullable();
            $table->string('cf_name')->nullable();
            $table->longText('cf_desc')->nullable();
            $table->string('cf_roasted')->nullable();
            $table->text('cf_ingredients')->nullable()->comment("İçindekiler");
            $table->string('cf_image')->nullable();
            $table->string('cf_category')->nullable()->comment("Kahve kategorisi kodu");
            $table->tinyInteger('cf_status')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->tinyInteger('cf_campaign')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->softDeletes();
            $table->timestamp('cf_created_at')->nullable();
            $table->softDeletes('cf_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coffees');
    }
};
