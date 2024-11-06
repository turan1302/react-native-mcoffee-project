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
        Schema::create('prices', function (Blueprint $table) {
            $table->id('cfp_id');
            $table->string('cfp_coffee')->nullable();
            $table->string('cfp_size')->nullable();
            $table->decimal('cfp_price',10,2)->nullable();
            $table->tinyInteger('cfp_status')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->tinyInteger('cfp_default')->default(1)->nullable()->comment("1 aktif 0 pasif");
            $table->softDeletes();
            $table->timestamp('cfp_created_at')->nullable();
            $table->timestamp('cfp_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
