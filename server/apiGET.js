const axios = require('axios');
const config = require('./config.js');

let getProducts = (callback) => {
  let options = {
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };

  let header = {
    headers: {
      'Authorization': `${config.TOKEN}`
    }
  }

  axios.get(options.url, header)
    .then((results) => { callback(null, results.data) })
    .catch((err) => { callback(err) })
}

module.exports.getProducts = getProducts;