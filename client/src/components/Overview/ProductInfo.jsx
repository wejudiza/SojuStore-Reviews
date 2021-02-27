import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductInfo(props) {
  const [info, setInfo] = useState([]);
  const [size, setSize] = useState([]);
  const [quantityLimit] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const [sizeSelect, setSizeSelect] = useState(0);

  useEffect(() => {
    if (props.data !== undefined) {
    axios.get(`/api/styles/${props.data}`)
      .then((results) => { setInfo(results.data.results) })
      .catch((err) => { console.error(err) });
    }
  }, [props.data]);

  useEffect(() =>{
    var storage = []
    info.map(item => {
      storage.push({ style_id: item.style_id, skus: [item.skus]})
      setSize(storage)
    })
  }, [info])

  return (
    <div>
      { console.log('info:  ', info) }
      { console.log('size: ', size)}
      {/* main image here */}
      {/* <img src=""></img> */}
      <div>
        <select onChange={(e) => { setSizeSelect(e.target.value); console.log(sizeSelect)}}>
          {/* drop down for sizes, hardcoded to first style  */}
          { size.length > 0 ? size[0].skus.map((itemA, index) => {
            console.log('itemA: ', itemA)
            var object = Object.values(itemA)
            var keys = Object.keys(itemA)
            console.log('keys: ', keys)
            return ( object.map((item, index) => {
              if (item.quantity > 0) {
                return ( <option key={index} value={keys[index]}>{item.size}</option> )
              }
            }))
            // <option key={index}>{item.quantity}</option>
          }) : null}
        </select>
        <select>
          {quantityLimit.map(item => (
            <option>{item}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductInfo