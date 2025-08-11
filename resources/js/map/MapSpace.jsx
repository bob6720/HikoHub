import React from 'react';

export default function MapSpace({ space, isSelected, onSelect, onBookedClick }) {
  const handleClick = () => {
    if (space.status === 'booked') {
      onBookedClick(space);
    } else {
      onSelect(space.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => console.log(`Hovered over ${space.name}`)}
      className={`absolute border-2 cursor-pointer transition-colors duration-300 ${
        isSelected
          ? 'bg-pink-400 border-pink-600'
          : space.status === 'booked'
          ? 'bg-gray-500 border-gray-700 cursor-not-allowed'
          : 'bg-purple-400 border-purple-600'
      }`}
      style={{
        top: space.y,
        left: space.x,
        width: space.width,
        height: space.height,
      }}
    ></div>
  );
}
