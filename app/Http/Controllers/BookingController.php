<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

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
            'event_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
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
            'additional_details' => 'nullable|string|max:1000', // ✅ new field added
        ]);

        // Create booking record
        $booking = Booking::create($validated);

        return response()->json([
            'success' => true,
            'data' => $booking,
        ], 201);
    }

    /**
     * Check if booking times overlap (supports bookings that cross midnight)
     */
    public function checkBooking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'crosses_midnight' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        try {
            // Create Carbon instances for the new booking
            $newStart = Carbon::createFromFormat('Y-m-d H:i', $data['event_date'] . ' ' . $data['start_time']);
            $newEnd = Carbon::createFromFormat('Y-m-d H:i', $data['event_date'] . ' ' . $data['end_time']);

            // Handle midnight crossing
            if ($data['crosses_midnight'] && $newEnd->lt($newStart)) {
                $newEnd->addDay();
            }

            // PostgreSQL-compatible overlap check
            $conflict = DB::table('bookings')
                ->where(function ($query) use ($newStart, $newEnd) {
                    // Existing booking starts during new booking
                    $query->where('event_date', $newStart->format('Y-m-d'))
                          ->whereRaw('TO_TIMESTAMP(CONCAT(event_date, \' \', start_time), \'YYYY-MM-DD HH24:MI\') < ?', [$newEnd])
                          ->whereRaw('TO_TIMESTAMP(CONCAT(event_date, \' \', end_time), \'YYYY-MM-DD HH24:MI\') > ?', [$newStart]);
                })
                ->exists();

            return response()->json([
                'conflict' => $conflict,
                'message' => $conflict ? 'Booking conflict found' : 'No conflicts found'
            ]);

        } catch (\Exception $e) {
            Log::error('Booking overlap check failed: ' . $e->getMessage());
            return response()->json(['error' => 'Database error'], 500);
        }
    }
}
