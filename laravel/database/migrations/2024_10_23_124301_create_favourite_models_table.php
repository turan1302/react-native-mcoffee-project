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
        Schema::create('favourites', function (Blueprint $table) {
            $table->id('fv_id');
            $table->string('fv_coffee')->nullable();
            $table->integer('fv_user')->nullable();
            $table->softDeletes();
            $table->timestamp('fv_created_at')->nullable();
            $table->timestamp('fv_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favourites');
    }
};
