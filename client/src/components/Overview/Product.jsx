import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ProductInfo from './ProductInfo.jsx';
import StyleSelect from './StyleSelect.jsx';

function Product() {
  const [data, setData] = useState([]);
  // const [photo, setPhoto] = useState([]);

  useEffect(() => {
    axios.get('/api')
      .then((results) => setData(results.data[0]))
      .catch((err) => console.error(err));
  }, []);

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
