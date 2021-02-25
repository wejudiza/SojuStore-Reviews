// Import github config
const axios = require('axios');
// Import github headers config
const config = require('./config.js');

// Controllers for Ratings & Reviews
const controllersRR = {

  // Gets reviews by product id
  get: (req) => {
    let params = req.params;
    console.log(req.params);
    return axios.get(`${config.url}/reviews/${req.params.id}`, config.headers)
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err))
  }

};

console.log(controllersRR.get());