const axios = require('axios');
const config = require('./config.js');

let header = {
  headers: {
    'Authorization': `${config.TOKEN}`
  }
}

products = {
  getProducts: (callback) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products'

    axios.get(url, header)
      .then((results) => { callback(null, results.data) })
      .catch((err) => { callback(err) })
  },
  getProductId: (req, callback) => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}`

    axios.get(url, header)
      .then((results) => { callback(null, results.data) })
      .catch((err) => { callback(err) })
  },
  getProductStyles: (req, callback) => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}/styles`

    axios.get(url, header)
      .then((results) => { callback(null, results.data) })
      .catch((err) => { callback(err) })
  }
}

cart = {
  getCart: (callback) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart'

    axios.get(url, header)
      .then((results) => { callback(null, results.data) })
      .catch((err) => { callback(err) })
  },
  addToCart: (req, callback) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart'

    axios.post(url, header)
      .then((results) => { console.log('Succes!') })
      .catch((err) => { callback(err) })
  }
}

// not working, come back later and fix it
interaction = {
  postInter: (req, callback) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/interactions'
    let data = {
      element: `${req.body.element}`,
      widget: `${req.body.widget}`,
      time: `${req.body.time}`
    }

    axios.post(url, data, header)
      .then((results) => { callback(null, results) })
      .catch((err) => { console.log(err); callback(err) })
  }
}

module.exports.getProd = {
  products,
  cart,
  interaction
}
