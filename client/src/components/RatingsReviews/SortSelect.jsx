import React from 'react';

// Dropdown select component that updates sort state on change
export default function SortSelect({ handleSelect }) {
  // Options + state handler for dropdown
  const options = ['relevant', 'helpful', 'newest'];

  return(
    <div className="sort-option">
      <select id="sort-select" onChange={handleSelect}>
        { options.map((option) => <option key={option} value={option}>{option}</option>) }
      </select>
    </div>
  );
}
