import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

// need to test out OUT OF STOCK
// small bug: when user clicks a new DEFAULT THUMBNAIL, drop down list needs to go back to DEFAULT

function ProductInfo(props) {
  const [size, setSize] = useState([]);
  const [quantityLimit] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const [quantity, setQuantity] = useState([]);
  const [outOfStock, setStock] = useState(true);
  const [userSize, setUserSize] = useState(['Select Size']);
  const [userQuantity, setUserQuantity] = useState('-');
  const [menu, setMenu] = useState(false);
  const [disable, setDisable] = useState(false);

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

  const handleChangeSize = (inputVal) => {
    var newStorage = [];
    var value = inputVal.value.split(',')
    // value[0] = quantity of sizes, value[1] = sku_ids
    if (Number(value[0]) === 0) {
      newStorage.push(Number(value[0]))
      setStock(true)
      setQuantity(newStorage)
      setUserSize([inputVal.label, Number(value[1])])
    } else if (Number(value[0] > 0)) {
      for (var i = 1; i <= Number(value[0]); i++) {
        newStorage.push(i)
      }
      setQuantity(newStorage);
      setStock(false);
      setUserSize([inputVal.label, Number(value[1])]);
      setUserQuantity(1);
    } else if (value[0] === 'Select Size') {
      setUserSize(['Select Size', 'Select Size'])
      setUserQuantity('-')
      setStock(false);
      setQuantity(['-'])
    }
    setMenu(!menu)
  }

  const handleClickCartButton = () => {
    if (!isNaN(userSize[1])) {
      const size_id = {
        sku_id: userSize[1]
      }

      axios.post('/api/cart', size_id)
        .then((results) => alert('Added!'))
        .catch((err) => console.error(err))

      setUserQuantity(1)
    } else {
      alert('Please select size')
      setMenu(true);
    }
  }

  const sizeOptions = () => {
    const options = [
      {value: 'Select Size', label: 'Select Size'}
    ]
    size[1].map(itemA => {
      var sku = Object.keys(itemA)
      var object = Object.values(itemA)
      object.map((item, index) => {
        if (item.quantity > 0) {
          options.push({value: `${item.quantity},${sku[index]}`, label: item.size})
        }
      })
    })
    return options
  }

  const qtyOptions = () => {
    const option = []

    if (quantity[quantity.length-1] > 15) {
      quantityLimit.map((item) => {
        option.push({ value: item, label: item })
      })
    } else if (quantity[quantity.length-1] > 0 && quantity[quantity.length-1] <= 15) {
      quantity.map(item => {
        option.push({ value: item, label: item })
      })
    } else if (quantity[0] === 0) {
      option.push({ value: 'OUT OF STOCK', label: 'OUT OF STOCK' })
      setDisable(!disable)
    } else {
      option.push({ value: '-', label: '-' })
    }

    return option
  }

  const changeQty = (inputVal) => {
    setUserQuantity(inputVal.value)
  }

  return (
    <div>
      <div>
        { size.length > 0 ? <Select value={[{ value: userSize[0], label: userSize[0] }]} options={sizeOptions()} onChange={handleChangeSize.bind(this)} blurInputOnSelect menuIsOpen={menu} onFocus={() => { if (!menu) setMenu(!menu)}}/> : null}
        <Select value={[{ value: userQuantity, label: userQuantity}]} options={qtyOptions()} onChange={changeQty.bind(this)} isDisabled={userQuantity[0] === 'OUT OF STOCK' || userQuantity[0] === '-' ? true : false } />
      </div>
      <div>
        {outOfStock ? null : <button className="cartBtn" onClick={handleClickCartButton.bind(this)}><i className="fas fa-cart-plus"></i>ADD TO CART</button>}
      </div>
    </div>
  )
}

export default ProductInfo
