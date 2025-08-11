import React, { useState, useMemo } from 'react';
import Layout from '@/Layouts/MainLayout';

export default function Events({ events }) {
  const [sortBy, setSortBy] = useState('event_date');

  // Sort events based on sortBy value
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      if (sortBy === 'event_date') {
        return new Date(a.event_date) - new Date(b.event_date);
      } else if (sortBy === 'organiser') {
        return a.organiser.localeCompare(b.organiser);
      }
      return 0;
    });
  }, [events, sortBy]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Upcoming Events</h1>

        {/* Sort Filter */}
        <div className="mb-4 flex justify-end items-center space-x-3">
          <label htmlFor="sort" className="font-semibold text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-9 py-2 text-gray-700 bg-white shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                      transition duration-150 ease-in-out"
          >
            <option value="event_date">Event Date</option>
            <option value="organiser">Organiser</option>
          </select>
        </div>

        {/* Events grid */}
        <div
          className="grid gap-6"
          style={{ 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' 
          }}
        >
          {sortedEvents.map(event => (
            <div
              key={event.id}
              className="bg-black rounded shadow-md p-6 border border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-800">{event.event_name}</h2>
              <p className="mb-1"><strong>Organiser:</strong> {event.organiser}</p>
              <p className="mb-1"><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
              <p className="mb-1"><strong>Start Time:</strong> {event.start_time}</p>
              <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
              <p><strong>Number of People:</strong> {event.number_of_people}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
