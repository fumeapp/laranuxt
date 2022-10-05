<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHumbleTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('token', 64)->unique();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('source')->nullable();
            $table->json('abilities')->nullable();

            // user metadata
            $table->string('ip', 300)->nullable();
            $table->string('agent')->nullable();
            $table->string('location')->nullable();

            $table->timestamps();
            $table->primary('token');
        });

        Schema::create('attempts', function (Blueprint $table) {
            $table->string('token', 64)->unique();

            // action functionality store data involving what the user was doing
            $table->json('action')->nullable();

            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('ip', 300)->nullable();
            $table->string('agent')->nullable();

            $table->timestamps();
            $table->primary('token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('attempts');
    }
}
