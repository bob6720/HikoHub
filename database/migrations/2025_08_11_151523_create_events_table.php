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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('organiser');
            $table->string('company');
            $table->string('contact_number');
            $table->string('contact_email');
            $table->date('event_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('number_of_people');
            $table->string('parking')->nullable();
            $table->string('access_required')->nullable();
            $table->string('aircon_time')->nullable();

            // Optional sections
            $table->boolean('wants_catering')->default(false);
            $table->string('catering_required')->nullable();
            $table->string('caterer')->nullable();
            $table->string('catering_organiser')->nullable();
            $table->string('alcohol')->nullable();
            $table->string('catering_time_required')->nullable();
            $table->string('catering_gl_code')->nullable();
            $table->text('dietary_requirements')->nullable();

            $table->boolean('wants_equipment')->default(false);
            $table->string('av_equipment')->nullable();
            $table->string('chairs')->nullable();
            $table->string('tables')->nullable();
            $table->string('displays')->nullable();
            $table->string('marketing_signage')->nullable();
            $table->string('equipment_gl_code')->nullable();

            $table->boolean('wants_extras')->default(false);
            $table->string('boards')->nullable();
            $table->string('furniture')->nullable();
            $table->string('comms')->nullable();
            $table->string('for_visitors')->nullable();
            $table->string('music')->nullable();
            $table->string('arriving')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
