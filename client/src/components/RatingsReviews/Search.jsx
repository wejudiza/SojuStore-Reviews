import React, { useState } from 'react';

export default function Search({ setSearch }) {
  return (
    <div>
      <form id="search-bar" onChange={setSearch}>
        <input id="search-input" type="text" placeholder=" Search" />
      </form>
    </div>
  );
}
