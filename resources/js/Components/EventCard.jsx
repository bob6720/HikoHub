import { calendarLink } from "@/Utils/calendarLink";

export default function EventCard({event}){
    return(
        <div className="bg-black rounded shadow-md p-6 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
            <a href={calendarLink(event)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-white text-sm hover:bg-blue-700"> 
                Add to Calendar {/* Add icon vector */}
            </a>
            
            <h2 className="text-xl font-semibold mb-2 text-purple-800">{event.event_name}</h2>
            <p className="mb-1">{event.organiser}</p>
            <p className="mb-1">{new Date(event.event_date).toLocaleDateString()}</p>
        </div>      
    );
}