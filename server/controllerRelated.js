const axios = require('axios');
const config = require('./config.js');

const controllerRelated = {
  getRelatedProducts: (req, res) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}/related`;

    axios.get(url, config.headers)
      .then((results) => res.send(results.data))
      .catch((err) => res.send(err));
  },
};

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/:product_id/related
// test id: 16392

module.exports = controllerRelated;

// GET /products/:product_id/related
