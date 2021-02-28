import React from 'react';

// Dropdown select component that updates sort state on change
export default function SortSelect(props) {
  // Options + state handler for dropdown
  const options = ['relevant', 'helpful', 'newest'];

  return(
    <div className="sort-option">
      <select id="sort-select" onChange={props.handleSelect}>
        { options.map(option => <option key={option} value={option}>{option}</option>) }
      </select>
    </div>
  );
}
