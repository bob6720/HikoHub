export default function EventCard({event}){
    return(
              <div className="bg-black rounded shadow-md p-6 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
              
              <h2 className="text-xl font-semibold mb-2 text-purple-800">{event.event_name}</h2>
              <p className="mb-1"><strong>Organiser:</strong> {event.organiser}</p>
              <p className="mb-1"><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
              <p className="mb-1"><strong>Start Time:</strong> {event.start_time}</p>
              <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
              </div>
    );
}