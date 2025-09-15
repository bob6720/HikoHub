import { calendarLink } from "@/Utils/calendarLink";

export default function EventCard({event}){
    function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });
}
    return(
        <div className="bg-black rounded-2xl shadow p-4 h-80">

            <div className="relative mb-6 h-2/3">
                <div className="bg-purple-500 rounded-xl h-full w-full"> 
                    <a className="absolute top-2 left-2 text-xs bg-black/70 text-white px-6 py-3 rounded-full" href={calendarLink(event)} target="_blank" rel="noopener noreferrer"> 
                        Add to Calendar {/* Add calendar icon vector */}
                    </a>
                    <span className="absolute bottom-2 left-2 text-4xl text-white font-semibold px-2 py-1 rounded">
                        {formatDate(event.event_date)}
                    </span>
                </div>
            </div>
            
            <h3 className="text-xl text-purple-500 font-semibold">{event.event_name}</h3>
            <p className="text-l text-white-600 mt-3">{event.organiser}</p> {/* Should be company? */}
        </div>   
    );

}