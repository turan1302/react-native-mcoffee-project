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
        Schema::create('address', function (Blueprint $table) {
            $table->id('add_id');
            $table->integer('add_user')->nullable();
            $table->string('add_city')->nullable();
            $table->string('add_district')->nullable();
            $table->string('add_title')->nullable();
            $table->text('add_desc')->nullable();
            $table->string('add_tax_no')->nullable();
            $table->string('add_tax_office')->nullable();
            $table->tinyInteger('add_default')->default(0)->comment('0 ise varsayılan değil 1 ise varsayılan')->nullable();
            $table->tinyInteger('add_type')->comment('0 ise bireysel 1 ise kurumsal')->nullable();
            $table->softDeletes();
            $table->timestamp('add_created_at')->nullable();
            $table->timestamp('add_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address');
    }
};
