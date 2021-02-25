const axios = require('axios');
const config = require('./config.js');
//const productId = () require productId from productID get request

let getQnA = (callback) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?${productId}`,
    headers: {
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      }
    }
  };

  axios.get(options.url, options.headers)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err)
    })
}

module.exports.getQnA = getQnA;