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
        Schema::create('logs', function (Blueprint $table) {
            $table->id('lg_id');
            $table->string('lg_title')->nullable();
            $table->text('lg_desc')->nullable();
            $table->integer('lg_user')->nullable();
            $table->string('lg_date')->comment("Tarihin saatsiz hali")->nullable();
            $table->string('lg_ip')->nullable();
            $table->softDeletes();
            $table->timestamp('lg_created_at')->nullable();
            $table->timestamp('lg_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
