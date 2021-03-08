import React from 'react';

// Dropdown select component that updates review tiles order
export default function SortSelect({ handleSelect }) {
  const options = ['relevant', 'helpful', 'newest'];

  return (
    <div className="sort-option">
      <select id="sort-select" onChange={handleSelect}>
        { options.map((option) => <option key={option} value={option}>{option}</option>) }
      </select>
    </div>
  );
}
