<?php

namespace App\Http\Controllers;
use App\Models\Event;

use Illuminate\Http\Request;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $event = new Event();
        $event->fill($data);
        $event->wants_catering = $request->has('catering_required');
        $event->wants_equipment = $request->has('av_equipment');
        $event->wants_extras = $request->has('boards');
        $event->save();

        return redirect()->route('event.list')->with('success', 'Event booked successfully!');
    }

    public function index()
    {
        $events = Event::latest()->get();
        return view('list-event', compact('events'));
    }
}
