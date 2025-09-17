export function calendarLink(event){
    // Build Date objects from separate date + time
    const startDate = new Date (`${event.event_date}T${event.start_time}`);
    const endDate = new Date(`${event.event_date}T${event.end_time}`);


    // reformats date into Google string format
    const formatDate  = (date) =>
    new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
        text: event.event_name,
        dates:`${start}/${end}`,
        details: event.description || "", // description doesn't exist yet..
        location: event.location || "HIKO Hub, The University of Waikato, Gate 5, Hillcrest Road, Hamilton 3240"
    });
    // return calendar url with params
    return `${base}&${params.toString()}`;
}