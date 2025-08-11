import React, { useState } from 'react';
import Layout from '@/Layouts/MainLayout'; // Import MainLayout

const ROOMS = {
  1: [
    { id: 1, name: 'Room 101' },
    { id: 2, name: 'Room 102' },
    { id: 3, name: 'Room 103' },
    { id: 4, name: 'Room 104' },
  ],
  2: [
    { id: 5, name: 'Room 201' },
    { id: 6, name: 'Room 202' },
    { id: 7, name: 'Room 203' },
    { id: 8, name: 'Room 204' },
  ],
};

const BOOKINGS = {
  '2025-08-13': [2, 5],
  '2025-08-14': [1, 3, 7],
  '2025-08-15': [4, 6, 8],
};

const getRoomName = (id) => {
  for (const floorRooms of Object.values(ROOMS)) {
    const room = floorRooms.find(r => r.id === id);
    if (room) return room.name;
  }
  return 'Unknown Room';
};

function generateCalendarDays(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }
  return calendarDays;
}

export default function BookingCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const formatDate = (date) => date.toISOString().split('T')[0];

  const bookingsForSelectedDate = selectedDate
    ? BOOKINGS[formatDate(selectedDate)] || []
    : [];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(m => m - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(m => m + 1);
    }
    setSelectedDate(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Booking Calendar</h1>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Previous
          </button>
          <div className="text-xl font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold border-b pb-2">{day}</div>
          ))}

          {calendarDays.map((date, idx) => {
            if (!date) return <div key={idx} />;
            const dateStr = formatDate(date);
            const hasBooking = BOOKINGS[dateStr]?.length > 0;

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`
                  py-2 rounded
                  ${hasBooking ? 'bg-pink-400 text-white' : 'bg-gray-200'}
                  ${selectedDate && formatDate(selectedDate) === dateStr ? 'ring-4 ring-pink-600' : ''}
                  hover:ring-2 hover:ring-pink-400
                `}
                aria-label={`Day ${date.getDate()}, ${hasBooking ? 'has bookings' : 'no bookings'}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {selectedDate ? `Bookings for ${selectedDate.toDateString()}` : 'Select a date'}
          </h2>

          {selectedDate && bookingsForSelectedDate.length > 0 ? (
            <ul className="list-disc list-inside">
              {bookingsForSelectedDate.map(roomId => (
                <li key={roomId}>
                  {getRoomName(roomId)} (Room ID: {roomId})
                </li>
              ))}
            </ul>
          ) : selectedDate ? (
            <p>No bookings on this date.</p>
          ) : (
            <p>Please select a date on the calendar to view bookings.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
