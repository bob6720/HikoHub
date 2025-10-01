<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('organiser')->nullable();
            $table->string('business')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('contact_email')->nullable();
            $table->date('event_date')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->integer('number_of_people')->nullable();
            $table->string('parking')->nullable();
            $table->string('access_required')->nullable();
            $table->time('aircon_time')->nullable();
            $table->string('catering_required')->nullable();
            $table->string('caterer')->nullable();
            $table->string('catering_organiser')->nullable();
            $table->string('alcohol')->nullable();
            $table->string('catering_time_required')->nullable();
            $table->string('catering_gl_code')->nullable();
            $table->text('dietary_requirements')->nullable();
            $table->string('wants_equipment')->nullable();
            $table->string('av_equipment')->nullable();
            $table->integer('chairs')->nullable();
            $table->integer('tables')->nullable();
            $table->string('displays')->nullable();
            $table->string('marketing_signage')->nullable();
            $table->string('equipment_gl_code')->nullable();
            $table->string('wants_extras')->nullable();
            $table->string('boards')->nullable();
            $table->string('furniture')->nullable();
            $table->string('comms')->nullable();
            $table->string('for_visitors')->nullable();
            $table->string('music')->nullable();
            $table->string('arriving')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
