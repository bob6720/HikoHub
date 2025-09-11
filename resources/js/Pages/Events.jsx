import React, { useState, useMemo } from 'react';
import Layout from '@/Layouts/MainLayout';
import EventCard from '@/Components/EventCard';

export default function Events({ events }) {
  // check for events
  if (events.length == 0){
    return (
      <div className="text-center mt-10 text-gray-400">
        No upcoming events found.
      </div>
    )
  }
  // useMemo stores the sorted list; it only recalculates when `events` changes
  const sortedEvents = useMemo(() => {
  // Copy events from parent and sort by event_date
    return [...events].sort((a, b) => {
        return new Date(a.event_date) - new Date(b.event_date);
    });

  }, [events]); // dependencies 

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Events</h1>
        </div>

        {/* Search bar */}
        <div>

        </div>

        {/* Events grid */}
        {/* / Fit as many columns as possible, otherwise expand to fill space. */} 
        <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
          {

            sortedEvents.map(event => (
              // build card for each event
              <EventCard key={event.id} event = {event}/>
            ))
          }
        </div>

      </div>

    </Layout>
  );
}
