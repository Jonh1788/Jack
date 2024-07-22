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
        Schema::create('sorteio', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json("participants")->nullable();
            $table->string('winner')->nullable();
            $table->boolean('finished')->default(false);
            $table->dateTime('date')->default(now());
            $table->integer("total_numbers")->default(0);
            $table->dateTime('end_date')->nullable();
            $table->float("prize")->nullable();
            $table->string("hash")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sorteio');
    }
};
