import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';

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
      <h1>{data.name}</h1>
      <div className="product-detail">
        {data.description}
      </div>
      <div className="product-slogan">
        {data.slogan}
      </div>
      $ {data.default_price}
      <ProductInfo prop={data.id} />
      { console.log(data) }
    </div>
  )
};

export default Product;
