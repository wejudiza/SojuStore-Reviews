import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductInfo(props) {
  const [size, setSize] = useState([]);
  const [quantityLimit] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const [quantity, setQuantity] = useState([]);
  const [outOfStock, setStock] = useState(true);
  const [userSize, setUserSize] = useState();
  const [userQuantity, setUserQuantity] = useState();

  const setMain = () => {
    if (Object.keys(props.default).length > 0) {
      var storage = [];
      storage.push(props.default.style_id);
      storage.push([props.default.skus])
      setSize(storage);
    }
  }

  useEffect(() =>{
    setMain();
  }, [props.default])

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
    setUserQuantity(1);
  }

  const handleClickCartButton = () => {
    if (!isNaN(userSize)) {
      const size_id = {
        sku_id: userSize
      }

      axios.post('/api/cart', size_id)
        .then((results) => alert('Added!'))
        .catch((err) => console.error(err))

      setUserQuantity(1)
    } else {
      alert('Please select size')
      // set function to open drop down select size list
      document.getElementById('test').click();
    }
  }

  return (
    <div>
      <div>
        {console.log(userSize)}
        <select onChange={handleChange.bind(this)}>
          <option>Select Size</option>
          { size.length > 0 ? size[1].map(itemA => {
            var sku = Object.keys(itemA)
            var object = Object.values(itemA)
            return ( object.map((item, index) => {
              if (item.quantity > 0) {
                return ( <option key={index} value={`${item.quantity},${sku[index]}`}>{item.size}</option> )
              }
            }))
          }) : null}
        </select>
        <select id="test" onChange={(e) => setUserQuantity(Number(e.target.value)) } value={userQuantity}>
          {quantity[quantity.length-1] > 15 ? quantityLimit.map((item, index) => {
            return ( <option key={index}>{item}</option> )
          }) : quantity[quantity.length-1] > 0 && quantity[quantity.length-1] <= 15 ? quantity.map((item, index) => {
            return ( <option key={index}>{item}</option> )
          }) : quantity[0] === 0 ? <option disabled>OUT OF STOCK</option> : <option>-</option>}
        </select>
      </div>
      <div>
        {outOfStock ? null : <button onClick={handleClickCartButton.bind(this)}>Add to Cart</button>}
      </div>
    </div>
  )
}

export default ProductInfo