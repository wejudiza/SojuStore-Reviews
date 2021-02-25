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

module.exports = products;