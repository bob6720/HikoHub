import React from 'react';

export default function SelectedSpaces({ selected }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Selected Spaces:</h2>
      {selected.length > 0 ? (
        <ul className="list-disc list-inside">
          {selected.map((id) => (
            <li key={id}>Space ID: {id}</li>
          ))}
        </ul>
      ) : (
        <p>No spaces selected.</p>
      )}
    </div>
  );
}