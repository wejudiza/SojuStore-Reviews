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

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const product_id = 16500;

export default function ProductBreakdown() {
  const [characteristics, setCharacteristics] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/reviews/meta/${product_id}`)
      .then((resp) => setCharacteristics(resp.data.characteristics))
      .then(() => setLoaded(true))
      .catch((err) => console.log(err));
  }, [loaded]);

  // Quality, Comfort 2 bars
  // Rest 3 bars

  return (
    <div id="product-breakdown">{JSON.stringify(characteristics)}</div>
  );
}
