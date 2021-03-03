import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import axios from 'axios';

import StyleSelect from './StyleSelect.jsx';

function Product() {
  const msg = useContext(UserContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(msg)
  }, [msg])

  return (
    <div>
      <div id="defaultDescription">
        <div className="category-rating">
        ***** <u>(star rating)</u>
        <br />
        {data.category}
        </div>
        <div className="product-detail">
        <h2>{data.name}</h2>
        <h4> <em>{data.slogan}</em> </h4>
        {data.description}
        </div>
      </div>
      <StyleSelect data={data.id} />
    </div>
  )
};

export default Product;
