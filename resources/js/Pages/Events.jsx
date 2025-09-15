import Layout from '@/Layouts/MainLayout';
import EventCard from '@/Components/EventCard';
import { Link } from '@inertiajs/react'; 
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

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
  const updateParams = (key, value) => {
    const p = new URLSearchParams(params);

    if (value === '' || value == null) {
      p.delete(key);
    } else {p.set(key, value);}

    p.delete('page'); // reset pagination
    return `/?${p.toString()}`; // returns URL with updated params
  };

  const handleSearch = (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault(); // intercept default form submit
      const url = updateParams('q', e.target.value); // get url with params
      router.visit(url); // let inertia handle navigation
    }
  }

  return (
    <Layout> {/* Page layout wrapper */}

      <div className="max-w-5xl mx-auto mt-8">

        <form className="flex flex-col gap-4 mb-16">
          {/* Row 1 */}
          <div className="flex items-center justify-between mt-8">
            {/* Page title */}
            <h1 className="text-8xl font-bold mb-6 text-center text-purple-700">Events</h1>
            <div className="flex gap-2">
              {/* Search by title/organiser keyword */}
              <input type="search" name="q" placeholder="Search.." defaultValue={q} 
              className="w-full max-w-md rounded-full border-purple-700 bg-black/30 px-3 py-2 text-l rounded" onKeyDown={handleSearch}/>
              {/* Filter by organiser */}
              <select name="organiser" defaultValue={org} className="rounded-full border-purple-700 bg-black/30 px-3 py-2 text-l text-purple-400" 
                onChange={(e) => {  // intercept default form submit 
                  const url = updateParams('organiser', e.target.value); // get url with params
                  router.get(url, {}, { preserveScroll: true, replace: true });
                }}>
                <option value="">All Organisers</option>
                {/* Populate dropdown with organiser list */}
                {organisers?.map(o => ( 
                  <option key={o} value={o}> 
                  {o} 
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
                <Link href={updateParams('when', 'week')}
                  className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 shadow-md  transition text-l flex items-center justify-center shadow-lg shadow">
                  This week
                </Link>
                <Link href={updateParams('when', 'month')}
                  className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition text-l flex items-center justify-center shadow-lg shadow">
                  This Month
                </Link>
                <Link href="/?" className="px-4 py-2 rounded-full border border-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition text-l flex items-center justify-center shadow-lg shadow">
                  Clear
                </Link>
            </div>
          </div>
        </form>

        {/* Events grid: show list of event cards or empty state */}
        {isEmpty ? (
          <p className="text-center text-white"> No Events Found.</p>
        ) : (
          <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
            {events.data.map(e=>(
              <div key={e.id} className="relative group">
                <EventCard event={e}/>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-150 ease-out">
                  <div className="w-[22rem] max-w-[80vw] rounded-xl bg-white/95 backdrop-blur px-5 py-4 shadow-2xl ring-1 ring-black/10 text-center">
                    <div className="text-base font-semibold text-gray-800">{e.event_name}</div>
                      {/* <div className="mt-1 text-sm text-gray-600">{new Date(e.event_date).toLocaleDateString()}</div> */}
                      <div className="mt-1 text-sm font-medium text-gray-700">
                        {new Date(`1970-01-01T${e.start_time}`).toLocaleTimeString([], {hour:'numeric', minute:'2-digit', hour12:true})}
                        {" – "}{new Date(`1970-01-01T${e.end_time}`).toLocaleTimeString([], {hour:'numeric', minute:'2-digit', hour12:true})}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{e.number_of_people} attending</div>
                    </div>
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
