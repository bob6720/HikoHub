import React from 'react';
import InteractiveMap from '@/map/InteractiveMap'; // alias '@' to resources/js
import Layout from '@/Layouts/MainLayout'; 

// Mock or fetch spaces data
const spaces = [
  {
    id: 1,
    name: 'Room A',
    floor: 1,
    x: 10,
    y: 20,
    width: 100,
    height: 80,
    status: 'available',
    bookings: ['2025-08-12', '2025-08-15'], // dates when booked
  },
  {
    id: 2,
    name: 'Room B',
    floor: 1,
    x: 120,
    y: 20,
    width: 100,
    height: 80,
    status: 'booked',
    bookings: ['2025-08-12'], // booked on Aug 12
  },
  // ...
];


export default function Booking() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Event Space</h1>
      <InteractiveMap spaces={spaces} />
    </Layout>
  );
}
