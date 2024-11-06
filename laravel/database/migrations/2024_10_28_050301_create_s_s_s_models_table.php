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
        Schema::create('sss', function (Blueprint $table) {
            $table->id("sss_id");
            $table->string('sss_title')->nullable();
            $table->text('sss_desc')->nullable();
            $table->tinyInteger('sss_status')->default(1)->nullable();
            $table->tinyInteger('sss_order')->default(0)->nullable();
            $table->softDeletes();
            $table->timestamp('sss_created_at')->nullable();
            $table->timestamp('sss_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sss');
    }
};
