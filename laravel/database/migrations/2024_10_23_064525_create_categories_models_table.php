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
        Schema::create('categories', function (Blueprint $table) {
            $table->id('cfc_id');
            $table->string('cfc_code')->nullable();
            $table->string('cfc_name')->nullable();
            $table->tinyInteger('cfc_status')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->softDeletes();
            $table->timestamp('cfc_created_at')->nullable();
            $table->timestamp('cfc_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
