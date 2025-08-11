import React from 'react';

export default function Legend() {
  return (
    <div className="flex space-x-4 mt-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-purple-400 border border-purple-600"></div>
        <span>Available</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-pink-400 border border-pink-600"></div>
        <span>Selected</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-500 border border-gray-700"></div>
        <span>Booked</span>
      </div>
    </div>
  );
}
