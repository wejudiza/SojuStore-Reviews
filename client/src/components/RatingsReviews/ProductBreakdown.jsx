// size, width, comfort, quality, length, fit
// ^^ how do i know what products have applicable characterstics?

// fetch / pass as props characteristics ratings
// create another dynamic bar component
// it needs to have either 2 or 3 sections
// for fit related characteristics
//   [----] [----] [----] (3) min, mid, max labels
// for quality related characteristics
//   [--------] [-------] (2) min, max labels
// also need to include some sort of visual indicator
/// that represents the WA / mean score for that particular characterstic

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductBreakdown({ product_id }) {
  const [metadata, setMetadata] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Fetch meta data for product from API
  useEffect(() => {

  }, [loaded]);

  return (
    <div id="product-breakdown">TEST</div>
  );
}
