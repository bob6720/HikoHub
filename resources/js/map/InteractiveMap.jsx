import React, { useState } from 'react';
import MapSpace from './MapSpace.jsx';
import Legend from './Legend.jsx';
import SelectedSpaces from './SelectedSpaces.jsx';

const ROOMS = {
  1: [
    { id: 1, name: 'Room 101', x: 20, y: 30, width: 100, height: 80 },
    { id: 2, name: 'Room 102', x: 140, y: 30, width: 100, height: 80 },
    { id: 3, name: 'Room 103', x: 260, y: 30, width: 100, height: 80 },
    { id: 4, name: 'Room 104', x: 380, y: 30, width: 100, height: 80 },
  ],
  2: [
    { id: 5, name: 'Room 201', x: 20, y: 30, width: 100, height: 80 },
    { id: 6, name: 'Room 202', x: 140, y: 30, width: 100, height: 80 },
    { id: 7, name: 'Room 203', x: 260, y: 30, width: 100, height: 80 },
    { id: 8, name: 'Room 204', x: 380, y: 30, width: 100, height: 80 },
  ],
};

const BOOKINGS = {
  '2025-08-13': [2, 5],
  '2025-08-14': [1, 3, 7],
  '2025-08-15': [4, 6, 8],
};

export default function InteractiveMap() {
  const [floor, setFloor] = useState(1);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState('');

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const rooms = ROOMS[floor];

  const bookedRoomIds = date && BOOKINGS[date] ? BOOKINGS[date] : [];

  const roomsWithStatus = rooms.map(room => ({
    ...room,
    status: bookedRoomIds.includes(room.id) ? 'booked' : 'available',
  }));

  const handleSelect = (id) => {
    if (!date) {
      alert('Please select a date before selecting spaces.');
      return;
    }

    setSelected((prev) =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };


  const handleBookedClick = (room) => {
    alert(`Sorry, "${room.name}" is already booked on ${date} and cannot be selected.`);
  };

  const handleFloorChange = (newFloor) => {
    setFloor(newFloor);
    setSelected([]);
  };

  const handleBooking = () => {
    if (!date) {
      alert('Please select a date before making a booking.');
      return;
    }
    if (selected.length === 0) {
      alert('Please select at least one space to book.');
      return;
    }

    // Example alert, replace with your booking logic (API call, etc)
    alert(`Booking made for date ${date} on rooms: ${selected.join(', ')}`);

    // Optionally clear selections after booking
    setSelected([]);
    setDate('');
  };

  return (
    <div>
      {/* Date Picker */}
      <div className="mb-4 flex justify-center">
        <label htmlFor="booking-date" className="mr-2 self-center font-semibold">
          Select Date:
        </label>
        <input
          id="booking-date"
          type="date"
          value={date}
          min={getTomorrowDate()}
          onChange={e => {
            setDate(e.target.value);
            setSelected([]);
          }}
          className="border border-gray-400 rounded px-3 py-1"
        />
      </div>

      {/* Floor Switch */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${floor === 1 ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => handleFloorChange(1)}
        >
          Floor 1
        </button>
        <button
          className={`px-4 py-2 rounded ${floor === 2 ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => handleFloorChange(2)}
        >
          Floor 2
        </button>
      </div>

      {/* Map */}
      <div className="relative w-full h-[500px] bg-gray-200">
        {roomsWithStatus.map(room => (
          <MapSpace
            key={room.id}
            space={room}
            isSelected={selected.includes(room.id)}
            onSelect={room.status === 'booked' ? () => handleBookedClick(room) : handleSelect}
          />
        ))}
      </div>

      <Legend />
      <SelectedSpaces selected={selected} />

      {/* Make Booking Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleBooking}
          disabled={selected.length === 0 || !date}
          className={`px-6 py-3 rounded font-semibold text-white transition ${
            selected.length === 0 || !date ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          Make Booking
        </button>
      </div>
    </div>
  );
}
