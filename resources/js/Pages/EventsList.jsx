import Layout from '@/Layouts/MainLayout';
import { router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import "../../css/booking.css";

export default function EventsList({ events }) {

    console.log(events)

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';

    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');

    const filteredEvents = events.filter(event =>
        event.event_name.toLowerCase().includes(search.toLowerCase()) && (
            date ? event.event_date === date :true
        )
    )

    // For setting the order of the dates
    const [sortOrder, setSortOrder] = useState('ascending');

    const sortedEvents = filteredEvents.sort((firstEvent, secondEvent) => {
        const firstDate = new Date(firstEvent.event_date);
        const secondDate = new Date(secondEvent.event_date);
        return sortOrder === 'ascending' ? firstDate - secondDate : secondDate - firstDate;
    })

    const handleSearch = (e) =>{
        if (e.key === 'Enter') {
            e.preventDefault(); // intercept default form submit
            const url = updateParams('q', e.target.value); // get url with params
            router.visit(url); // let inertia handle navigation
        }
    }

    // State to hold the event that was chosen from the table
    const [eventPicked, setEventPicked] = useState(null);

    // Deleting an event (send request to server)
    function deleteEvent(id) {

        router.delete(`/events/${id}`, {
            onSuccess: () => {
                alert("Event deleted.")
            },
            onError: () => {
                alert("Event failed to delete.")
            }
        })
    }

  return (
    <Layout>
        <button onClick={() => setSortOrder(sortOrder === "ascending" ? "descending" : "ascending")}>
            Sort by Date: {sortOrder === "Ascending" ? "Ascending" : "Descending"}
        </button>
        {/* Create new event button */}
        <Link href="/booking" 
            className="h-12 min-w-[140px] px-2 py-4  rounded-full border border-[#F04639] bg-[#F04639] text-white hover:bg-[#E32373] transition text-sm font-medium flex items-center justify-center shadow-lg">
            Create New Event
        </Link>

        {/* Date picker */}
        <input type="date" value={date}
         onChange={e => setDate(e.target.value)} className="w-full max-w-2xl h-12 rounded-full border-[#E32373] bg-[#F9FAFB] px-5 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E32373] focus:border-[#E32373]"/>
        
        {/* Search Bar */}
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} name="q" placeholder="Search.." defaultValue={q} className="w-full max-w-2xl h-12 rounded-full border-[#E32373] bg-[#F9FAFB] px-5 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E32373] focus:border-[#E32373]" onKeyDown={handleSearch}/>
        
        {/* Table to display the event information in */}
        <table className="w-full m-6">
            {/* Event headers */}
            <thead style={styles.th}>
                <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Organiser</th>
                    <th>Start Time</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                {/* Display all the events with filter applied */}
                {sortedEvents.map((event) => (
                    <tr key={event.id} onClick={() => setEventPicked(event)}>
                        <td style={styles.td}>{event.event_date}</td>
                        <td style={styles.td}>{event.event_name}</td>
                        <td style={styles.td}>{event.organiser}</td>
                        <td style={styles.td}>{event.start_time}</td>
                        <td style={styles.td}>{event.contact_number}</td>
                    </tr>
                ))}
                {sortedEvents.length === 0 && (
                    <p>No events Found</p>
                )}
            </tbody>
        </table>
        
        {/* If an event is selected, display more event details */}
        <h2>Event Details</h2>
        {eventPicked ? (
            
            <div className="client-details-box">
                <div className="form-row" style={styles.p}>
                    {/* Display the event information in more depth */}
                    <label>Event Name:</label>
                    <p>{eventPicked.event_name}</p>
                    <label>Event Date:</label>
                    <p>{eventPicked.event_date}</p>
                    <label>Organiser:</label>
                    <p>{eventPicked.organiser}</p>
                    <label>Start Time:</label>
                    <p>{eventPicked.start_time}</p>
                    <label>End Time:</label>
                    <p>{eventPicked.end_time}</p>
                    <label>Contact:</label>
                    <p>{eventPicked.contact_number}</p>
                    <label>Contact Email:</label>
                    <p>{eventPicked.contact_email}</p>
                    <label>Number of People:</label>
                    <p>{eventPicked.number_of_people}</p>

                    {/* Confirmation from user if they really want to delete the event. */}
                    <button className="h-12 min-w-[140px] px-2 py-4  rounded-full border border-[#F04639] bg-[#a5144e] text-white hover:bg-[#E32373] transition text-sm font-medium flex items-center justify-center shadow-lg" 
                        onClick={() => {
                        if (window.confirm("Are you sure you want to delete this event?")) {
                            deleteEvent(eventPicked.id)
                        }
                    }}>Delete Event</button>

                    
                
                </div>
            </div>   
        ) : (
            <p>Click on an event to show more details</p>
        )}


    </Layout>
  )
}

const styles = {
    td: {
        padding: 10,
        textAlign: "left"
    },
    th: {
        backgroundColor: "#EC4899",
        padding: 20
    },
    p: {
        textAlign: "left"
    }
}