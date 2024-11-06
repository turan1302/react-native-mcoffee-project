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
        Schema::create('client_settings', function (Blueprint $table) {
            $table->id('cs_id');
            $table->tinyInteger('cs_notify')->default(0)->nullable();
            $table->tinyInteger('cs_email')->default(0)->nullable();
            $table->tinyInteger('cs_sms')->default(0)->nullable();
            $table->integer('cs_client')->nullable();
            $table->softDeletes();
            $table->timestamp('cs_created_at')->nullable();
            $table->timestamp('cs_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_settings');
    }
};
