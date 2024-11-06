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
        Schema::create('order_products', function (Blueprint $table) {
            $table->id('orp_id');
            $table->string('orp_coffee')->nullable();
            $table->string('orp_size')->nullable();
            $table->string('orp_sugar')->nullable();
            $table->integer('orp_qty')->nullable();
            $table->decimal('orp_price',10,2)->nullable();
            $table->decimal('orp_total_price',10,2)->nullable();
            $table->string('orp_order')->nullable()->comment("Sipariş No");
            $table->softDeletes();
            $table->timestamp('orp_created_at')->nullable();
            $table->timestamp('orp_updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER calculate_total_price_order
            BEFORE INSERT ON order_products
            FOR EACH ROW
            SET NEW.orp_total_price = NEW.orp_qty * NEW.orp_price;
        ");

        DB::statement("
            CREATE TRIGGER calculate_total_price_order_before_update
            BEFORE UPDATE ON order_products
            FOR EACH ROW
            SET NEW.orp_total_price = NEW.orp_qty * NEW.orp_price;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS calculate_total_price_order");
        DB::statement("DROP TRIGGER IF EXISTS calculate_total_price_order_before_update");

        Schema::dropIfExists('order_products');
    }
};
