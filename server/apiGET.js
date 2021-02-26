const axios = require('axios');
const config = require('./config.js');

const header = {
  headers: {
<<<<<<< HEAD
    Authorization: `${config.TOKEN}`,
  },
};
=======
    'Authorization': `${config.token}`
  }
}
>>>>>>> 5bbca3718024203253934abf1ccb68ad57a2d270

const products = {
  getProducts: (callback) => {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';

    axios.get(url, header)
      .then((results) => { callback(null, results.data); })
      .catch((err) => { callback(err); });
  },
  getProductId: (req, callback) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}`;

    axios.get(url, header)
      .then((results) => { callback(null, results.data); })
      .catch((err) => { callback(err); });
  },
  getProductStyles: (req, callback) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}/styles`;

    axios.get(url, header)
      .then((results) => { callback(null, results.data); })
      .catch((err) => { callback(err); });
  },
};

const cart = {
  getCart: (callback) => {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart';

    axios.get(url, header)
      .then((results) => { callback(null, results.data); })
      .catch((err) => { callback(err); });
  },
  addToCart: (req, callback) => {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart';

    axios.post(url, header)
      .then((results) => { callback(null, results); })
      .catch((err) => { callback(err); });
  },
};

// not working, come back later and fix it
const interaction = {
  postInter: (req, callback) => {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/interactions';
    const data = {
      element: `${req.body.element}`,
      widget: `${req.body.widget}`,
      time: `${req.body.time}`,
    };

    axios.post(url, data, header)
      .then((results) => { callback(null, results); })
      .catch((err) => { console.log(err); callback(err); });
  },
};

module.exports = {
  products,
  cart,
  interaction,
};
