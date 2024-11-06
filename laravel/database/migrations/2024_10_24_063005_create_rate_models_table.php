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
        Schema::create('rates', function (Blueprint $table) {
            $table->id('rt_id');
            $table->string('rt_coffee')->nullable();
            $table->tinyInteger('rt_star')->nullable();
            $table->integer('rt_user')->nullable();
            $table->softDeletes();
            $table->timestamp('rt_created_at')->nullable();
            $table->timestamp('rt_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
