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
        <div className="bg-[#FCEDED] rounded-2xl shadow p-4 h-80">

            <div className="relative mb-6 h-2/3">
                <div className="bg-[#F7C5C4] rounded-xl h-full w-full"> 
                    <a className="absolute top-2 left-2 text-s bg-[#F04639] text-white px-6 py-3 rounded-full hover:bg-[#E32373] transition " href={calendarLink(event)} target="_blank" rel="noopener noreferrer"> 
                        Add to Calendar {/* Add calendar icon vector */}
                    </a>
                    <span className="absolute bottom-2 left-2 text-4xl text-[#690A32] px-2 py-1 rounded">
                        {formatDate(event.event_date)}
                    </span>
                </div>
            </div>
            
            <h3 className="text-xl text-[#690A32] font-semibold">{event.event_name}</h3>
            <p className="text-l text-[#7E0C3C] mt-3">{event.company}</p> {/* Should be company? */}
        </div>   
    );

}