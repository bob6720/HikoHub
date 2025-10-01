import Layout from '@/Layouts/MainLayout';
import { router, Link } from '@inertiajs/react';

export default function EventsList({ events }) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';

    const handleSearch = (e) =>{
    if (e.key === 'Enter') {
        e.preventDefault(); // intercept default form submit
        const url = updateParams('q', e.target.value); // get url with params
        router.visit(url); // let inertia handle navigation
    }
    }

    // Clears the editing event info meu
    function clearInfo() {
        // TODO
    }

  return (
    <Layout>
        <input type="search" name="q" placeholder="Search.." defaultValue={q} className="w-full max-w-2xl h-12 rounded-full border-[#E32373] bg-[#F9FAFB] px-5 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E32373] focus:border-[#E32373]" onKeyDown={handleSearch}/>
        
        {/* Table to display the event information in */}
        <table>
            <thead style={styles.th}>
                <th>Event Date</th>
                <th>Name</th>
                <th>Organiser</th>
                <th>Start Time</th>
                <th>Contact</th>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.id}>
                        <td style={styles.td}>{event.event_date}</td>
                        <td style={styles.td}>{event.event_name}</td>
                        <td style={styles.td}>{event.organiser}</td>
                        <td style={styles.td}>{event.start_time}</td>
                        <td style={styles.td}>{event.contact_number}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Create new event button */}
        <Link href={clearInfo()} 
            className="h-12 min-w-[140px] px-2 py-4  rounded-full border border-[#F04639] bg-[#F04639] text-white hover:bg-[#E32373] transition text-sm font-medium flex items-center justify-center shadow-lg">
            Create New Event
        </Link>
        
    </Layout>
  )

}

const styles = {
    td: {
        padding: 10,
        textAlign: "left"
    },
    th: {
        backgroundColor: "#d6d6d6ff",
        padding: 40
    }
}