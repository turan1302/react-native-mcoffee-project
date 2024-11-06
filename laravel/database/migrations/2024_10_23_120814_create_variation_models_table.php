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
        Schema::create('variations', function (Blueprint $table) {
            $table->id('vy_id');
            $table->string('vy_coffee')->nullable();
            $table->string('vy_ingredients')->nullable();
            $table->tinyInteger('vy_status')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->softDeletes();
            $table->timestamp('vy_created_at')->nullable();
            $table->timestamp('vy_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variations');
    }
};
