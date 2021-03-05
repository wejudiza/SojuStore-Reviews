import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Import components
import ProductBreakdownBar from './ProductBreakdownBar.jsx';

const product_id = 16500;

export default function ProductBreakdown() {
  const [characteristics, setCharacteristics] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Get characteristics metadata
  useEffect(() => {
    axios.get(`/api/reviews/meta/${product_id}`)
      .then((resp) => setCharacteristics(resp.data.characteristics))
      .then(() => setLoaded(true))
      .catch((err) => console.log(err));
  }, [loaded]);

  return (
    <div id="product-breakdown">
      <h3>Product Breakdown</h3>

      { /* Renders all product metadata characteristics */ }
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
