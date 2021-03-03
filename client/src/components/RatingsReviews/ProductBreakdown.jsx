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

const getTrianglePosition = (rating) => (((rating - 1) * 25));

export default function ProductBreakdown() {
  const [characteristics, setCharacteristics] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/reviews/meta/${product_id}`)
      .then((resp) => setCharacteristics(resp.data.characteristics))
      .then(() => setLoaded(true))
      // .then(() => console.log(getTrianglePosition(characteristics['Comfort'].value)))
      .catch((err) => console.log(err));
  }, [loaded]);

  // Quality, Comfort 2 bars
  // Rest 3 bars
  console.log(characteristics);
  // console.log(getTrianglePosition(characteristics['Comfort']value));
  return (
    <div id="product-breakdown">
      <h3>Product Breakdown</h3>
      { !characteristics ? null : (
        Object.keys(characteristics).map((prop) => (
          <ProductBreakdownBar
            characteristic={prop}
            value={characteristics[prop].value}
            key={characteristics[prop].id}
          />
        ))
      ) }
    </div>
  );
}

const ProductBreakdownBar = ({ characteristic, value }) => {
  let markerPosition = `${getTrianglePosition(value)}%`;
  return (
    <div className="product-breakdown">
      original value: { value }
      markerPosition: { markerPosition }
      <br />
      <div className="product-bar-container">
        <div className="product-bar-background"></div>
        <div className="product-bar-background"></div>
        <div className="product-bar-background"></div>
        <div className="triangle" style={{ left: markerPosition }}></div>
      </div>
    </div>
  );
}