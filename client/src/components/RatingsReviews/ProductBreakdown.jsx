import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../UserContext.jsx';

// Import components
import ProductBreakdownBar from './ProductBreakdownBar.jsx';

export default function ProductBreakdown() {
  const productID = useContext(UserContext).id;
  const [characteristics, setCharacteristics] = useState(null);

  // Get characteristics metadata
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/meta/${productID}`)
        .then((resp) => setCharacteristics(resp.data.characteristics))
        .catch((err) => console.log(err));
    }
  }, [productID]);

  return (
    <div id="product-breakdown">
      { /* Renders all product metadata characteristics */ }
      { !characteristics ? null : (
        Object.keys(characteristics).map((key) => (
          <ProductBreakdownBar
            characteristic={key}
            value={characteristics[key].value}
            key={characteristics[key].id}
          />
        ))
      ) }

    </div>
  );
}
