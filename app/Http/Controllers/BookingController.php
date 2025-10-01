<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Store a new booking in the database
     */
    public function store(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'event_name' => 'required|string|max:255',
            'organiser' => 'nullable|string|max:255',
            'business' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:50',
            'contact_email' => 'nullable|email|max:255',
            'event_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'number_of_people' => 'nullable|integer|min:1',
            'parking' => 'nullable|string|max:50',
            'access_required' => 'nullable|string|max:50',
            'aircon_time' => 'nullable|string|max:100',
            'catering_required' => 'nullable|string|max:50',
            'caterer' => 'nullable|string|max:255',
            'catering_organiser' => 'nullable|string|max:255',
            'alcohol' => 'nullable|string|max:50',
            'catering_time_required' => 'nullable|string|max:100',
            'catering_gl_code' => 'nullable|string|max:100',
            'dietary_requirements' => 'nullable|string|max:255',
            'wants_equipment' => 'nullable|string|max:50',
            'av_equipment' => 'nullable|string|max:255',
            'chairs' => 'nullable|integer',
            'tables' => 'nullable|integer',
            'displays' => 'nullable|string|max:255',
            'marketing_signage' => 'nullable|string|max:255',
            'equipment_gl_code' => 'nullable|string|max:100',
            'wants_extras' => 'nullable|string|max:50',
            'boards' => 'nullable|string|max:255',
            'furniture' => 'nullable|string|max:255',
            'comms' => 'nullable|string|max:255',
            'for_visitors' => 'nullable|string|max:50',
            'music' => 'nullable|string|max:50',
            'arriving' => 'nullable|string|max:255',
        ]);

        // Create booking record
        $booking = Booking::create($validated);

        // Return JSON response
        return response()->json([
            'success' => true,
            'data' => $booking,
        ], 201);
    }
}
