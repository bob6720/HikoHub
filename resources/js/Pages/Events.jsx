import React, { useState, useMemo } from 'react';
import Layout from '@/Layouts/MainLayout';
import EventCard from '@/Components/EventCard';
import { Link } from '@inertiajs/react'; 
import Modal from "@/Components/Modal"; 

export default function Events({ events, organisers}) {
  // Flags for pagination and empty state
  const isFirstPage = !events.prev_page_url; 
  const isEmpty = !events?.data || events.data.length === 0;
  // Get current query parameters so filters/search persist across renders
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') ?? '';
  const org = params.get('organiser') ?? '';
  const when = params.get('when') ?? '';

  // Helper: update query string with new filters (removes unused + resets page)
  const updateParams = (timeFilter) => {
  const p = new URLSearchParams(params);
  if (timeFilter.when === '') p.delete('when'); else p.set('when', timeFilter.when);
  p.delete('page'); // reset pagination
  return `/?${p.toString()}`;
  };

  return (
    <Layout> {/* Page layout wrapper */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div> {/* Page title */}
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Events</h1>
        </div>

        {/* Search and filters (search input, organiser dropdown, time buckets) */}
        <form method="get"  action="/" className="mb-6 flex gap-2 justify-center">
        {/* Search by title/organiser keyword */}
          <input type="search" name="q" placeholder="Search.."
          defaultValue={q} 
          className="w-full max-w-md rounded border border-white-700 bg-black/30 px-3 py-2 text-white" // styling
          />
        
        {/* Filter by organiser */}
        <select name="organiser" defaultValue={org} className="rounded border border-purple-700 bg-black/30 px-3 py-2 text-white" onChange={(e) => e.target.form.submit()}>
          <option value="">All Organisers</option>
          {/* Populate dropdown with organiser list */}
          {organisers?.map(o => ( 
            <option key={o} value={o}> 
              {o} 
            </option>
          ))}
        </select>

        {/* Quick time filters */}
          <Link
            href={updateParams({ when: 'week' })}
            className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition text-sm flex items-center justify-center"
          >
            This week
          </Link>
          <Link
            href={updateParams({ when: 'month' })}
            className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition text-sm flex items-center justify-center"
          >
            This Month
          </Link>
          <Link
            href={updateParams({ when: '' })}
            className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition text-sm flex items-center justify-center"
          >
            Clear
          </Link>
        </form>


        {/* Events grid: show list of event cards or empty state */}
        {isEmpty ? (
          <p className="text-center text-gray-400"> No Events Found.</p>
        ) : (
          <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {events.data.map(e=>(
              <div key={e.id} className="relative group">
                <EventCard event={e}/>
                {/* Tool tip on hover */}
                <div className="absolute hidden group-hover:block top-full mt-2 w-72 rounded-lg border bg-white p-3 shadow-xl z-50">
                  <div className="text-gray-600 text-sm">{e.event_name}</div>
                  <div className="text-gray-600 text-sm">{e.organiser}</div>
                  <div className="text-gray-600 text-sm">{new Date(e.event_date).toLocaleDateString()}</div> 
                  <div className="text-gray-600 text-sm">{e.start_time} - {e.end_time}</div>
                  <div className="text-gray-600 text-sm">{e.number_of_people} attending</div>
                  {/*<div className="text-gray-600 text-sm">Space: {e.space}</div>*/} 
                  {/*<div className="text-gray-600 text-sm">Description: {e.description}</div>*/} 
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          
          {/* Previous page link (hidden if on first page) */}
          {!isFirstPage && (
            <Link href={events.prev_page_url} className="px-4 py-2 rounded border border-white-700 hover:bg-pink-600">
              Previous
            </Link>  
          )}

          {/* Next page link */}
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
