import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductInfo(props) {
  const [info, setInfo] = useState([]);
  const [size, setSize] = useState([]);
  const [quantityLimit] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const [quantity, setQuantity] = useState([]);
  const [outOfStock, setStock] = useState(true);
  const [userSize, setUserSize] = useState();
  const [userQuantity, setUserQuantity] = useState();

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

  const handleChange = (e) => {
    var newStorage = [];
    var value = e.target.value.split(',')
    if (Number(value[0]) === 0) {
      newStorage.push(Number(value[0]))
      setStock(true)
      setQuantity(newStorage)
      setUserSize(Number(value[1]))
    } else {
      for (var i = 1; i <= Number(value[0]); i++) {
        newStorage.push(i)
      }
      setQuantity(newStorage);
      setStock(false);
      setUserSize(Number(value[1]))
    }
  }

  return (
    <div>
      {/* main image here */}
      {/* <img src=""></img> */}
      <div>
        <select onChange={handleChange.bind(this)}>
          <option>Select Size</option>
          {/* drop down for sizes, hardcoded to first style  */}
          { size.length > 0 ? size[0].skus.map((itemA, index) => {
            var sku = Object.keys(itemA)
            var object = Object.values(itemA)
            return ( object.map((item, index) => {
              if (item.quantity > 0) {
                return ( <option key={index} value={`${item.quantity},${sku[index]}`}>{item.size}</option> )
              }
            }))
          }) : null}
        </select>
        <select onChange={(e) => setUserQuantity(Number(e.target.value))}>
          {quantity[quantity.length-1] > 15 ? quantityLimit.map((item, index) => {
            if (index === 1) {
              return ( <option key={index}>{item}</option> )
            } else {
              return ( <option key={index}>{item}</option> )
            }
          }) : quantity[quantity.length-1] > 0 && quantity[quantity.length-1] <= 15 ? quantity.map((item, index) => {
            if (index === 1) {
              return ( <option key={index}>{item}</option> )
            } else {
              return ( <option key={index}>{item}</option> )
            }
          }) : quantity[0] === 0 ? <option>OUT OF STOCK</option> : <option>-</option>}
        </select>
      </div>
      <div>
        {outOfStock ? null : <button onClick={() => console.log(userSize, userQuantity) }>Add to Cart</button>}
      </div>
    </div>
  )
}

export default ProductInfo