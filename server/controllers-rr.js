// Import github config
const axios = require('axios');
// Import github headers config
const config = require('./config.js');

// Controllers for Ratings & Reviews
const controllersRR = {

  // Gets reviews by product id
  get: (req, res) => {
    console.log(config)
    axios.get(`${config.url}/reviews/?product_id=${req.params.product_id}`, config.headers)
      .then(resp => res.status(200).send(resp.data))
      .catch(err => res.status(400).send(err))
  }

};

module.exports = controllersRR;