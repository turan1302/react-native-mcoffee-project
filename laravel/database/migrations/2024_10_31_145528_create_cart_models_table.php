<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id('c_id');
            $table->integer('c_user')->nullable();
            $table->string('c_coffee')->nullable();
            $table->tinyInteger('c_sugar')->nullable()->comment("0 Şekersiz, 1 Az Şekerli, 2 Orta");
            $table->string('c_size')->nullable("S M ve L olarak");
            $table->integer('c_qty')->nullable();
            $table->decimal('c_price', 10, 2)->nullable();
            $table->decimal('c_total_price', 10, 2)->nullable();
            $table->softDeletes();
            $table->timestamp('c_created_at')->nullable();
            $table->timestamp('c_updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER calculate_total_price
            BEFORE INSERT ON carts
            FOR EACH ROW
            SET NEW.c_total_price = NEW.c_qty * NEW.c_price;
        ");

        DB::statement("
            CREATE TRIGGER calculate_total_price_before_update
            BEFORE UPDATE ON carts
            FOR EACH ROW
            SET NEW.c_total_price = NEW.c_qty * NEW.c_price;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS calculate_total_price");
        DB::statement("DROP TRIGGER IF EXISTS calculate_total_price_before_update");

        Schema::dropIfExists('carts');
    }
};
