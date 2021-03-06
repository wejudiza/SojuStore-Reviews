import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../UserContext.jsx';

// Import components
import ProductBreakdownBar from './ProductBreakdownBar.jsx';

export default function ProductBreakdown() {
  const productID = useContext(UserContext).id;
  const [characteristics, setCharacteristics] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Get characteristics metadata
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/meta/${productID}`)
        .then((resp) => setCharacteristics(resp.data.characteristics))
        .then(() => setLoaded(true))
        .catch((err) => console.log(err));
    }
  }, [productID, loaded]);

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
