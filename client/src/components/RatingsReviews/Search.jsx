import React, { useState } from 'react';

export default function Search({ setSearch }) {
  return (
    <div>
      <form id="search-bar" onChange={setSearch}>
        <input type="text" />
        {/* <label htmlFor="search">Search</label> */}
      </form>
    </div>
  );
}
