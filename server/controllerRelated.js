const axios = require('axios');
const config = require('./config.js')

const controllerRelated = {
  getRelatedProducts: (req, res) => {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}/related`,
      headers: {
        headers: {
          'User-Agent': 'request',
          'Authorization': `${config.TOKEN}`
        }
      }
    }


    axios.get(options.url, options.headers)
      .then((results) => res.send(results.data))
      .catch((err) => res.send(err))
  }
}



// https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/:product_id/related

module.exports = controllerRelated;









// GET /products/:product_id/related