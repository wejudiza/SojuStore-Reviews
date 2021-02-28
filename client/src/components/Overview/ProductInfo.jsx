import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductInfo(props) {
  const [size, setSize] = useState([]);

  useEffect(() => {
    axios.get(`/api/styles/${props.prop}`)
      .then((results) => { setSize(results.data) })
      .catch((err) => { console.error(err) });
  }, []);

  return (
    <div>
      { console.log('size:  ', size) }
      <select>
        <option>Test</option>
      </select>
    </div>
  )
}

export default ProductInfo