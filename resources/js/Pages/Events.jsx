import React, { useState, useMemo } from 'react';
import Layout from '@/Layouts/MainLayout';
import EventCard from '@/Components/EventCard';
import { Link } from '@inertiajs/react'; // not react-router-dom

export default function Events({ events }) {
  // check for events
  if (events.data.length == 0){
    return (
      <div className="text-center mt-10 text-gray-400">
        No upcoming events found.
      </div>
    )
  }

  const isFirstPage = !events.prev_page_url; 

  return (
    <Layout> {/* Main Layout Component*/}
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div> {/* Page title */}
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Events</h1>
        </div>

        {/* Search bar */}
        <div></div>

        {/* Events grid */}
        {/* / Fit as many columns as possible, otherwise expand to fill space. */} 
        <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
          {
            events.data.map(event => (
              // build card for each event
              <EventCard key={event.id} event = {event}/>
            ))
          }
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          
          {/* Prev: only show if not first page */}
          {!isFirstPage && (
            <Link href={events.prev_page_url} className="px-4 py-2 rounded border border-white-700 hover:bg-pink-600">
              Previous
            </Link>  
          )}

          {/* Next page */}
          {events.next_page_url && (
            <Link href={events.next_page_url} className="px-4 py-2 rounded border border-white-700 hover:bg-pink-600">
            Load More..
            </Link>
          )}

        </div>

      </div>

    </Layout>
  );
}
