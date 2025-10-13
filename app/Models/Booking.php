<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_name',
        'organiser',
        'business',
        'contact_number',
        'contact_email',
        'event_date',
        'start_time',
        'end_time',
        'number_of_people',
        'parking',
        'access_required',
        'aircon_time',
        'catering_required',
        'caterer',
        'catering_organiser',
        'alcohol',
        'catering_time_required',
        'catering_gl_code',
        'dietary_requirements',
        'wants_equipment',
        'av_equipment',
        'chairs',
        'tables',
        'displays',
        'marketing_signage',
        'equipment_gl_code',
        'wants_extras',
        'boards',
        'furniture',
        'comms',
        'for_visitors',
        'music',
        'arriving',
        'additional_details',
    ];
}
