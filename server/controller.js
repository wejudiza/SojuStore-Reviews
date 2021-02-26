<<<<<<< HEAD
// require models
const getQnA = require('./QnAGet.js');
const getProd = require('./apiGET.js');
=======
//require models
const getQnA = require('./apiQnA.js');
const products = require('./apiGET.js');
>>>>>>> 5bbca3718024203253934abf1ccb68ad57a2d270

const controller = {
  // to retrive a list of ALL products
  get: (req, res) => {
<<<<<<< HEAD
    getProd.products.getProducts((err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
=======
    products.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
>>>>>>> 5bbca3718024203253934abf1ccb68ad57a2d270
    });
  },
  // to retrieve all product level information for a SPECIFIC product ID
  getProducts: (req, res) => {
    getProd.products.getProductId(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  // to retrieve all styles available for the given product
  getProductStyles: (req, res) => {
<<<<<<< HEAD
    getProd.products.getProductStyles(req, (err, results) => {
=======
    products.getProductStyles(req, (err, results) => {
>>>>>>> 5bbca3718024203253934abf1ccb68ad57a2d270
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  getQnA: (req, res) => {
    getQnA.getQnA(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
<<<<<<< HEAD
  },
  // retrieve all products in the cart
  getAllCart: (req, res) => {
    getProd.cart.getCart((err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  // adds a product to the cart
  addCart: (req, res) => {
    getProd.cart.addToCart(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(201).send(results);
    });
  },
  // post interactions
  postInteraction: (req, res) => {
    getProd.interaction.postInter(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(201).send(results);
    });
  },
};

module.exports = controller;
=======
  },
  post: (req, res) => {
    res.send('post');
  },
  update: (req, res) => {
    res.send('update');
  },
  delete: (req, res) => {
    res.send('delete');
  },
};

module.exports = controller;
>>>>>>> 5bbca3718024203253934abf1ccb68ad57a2d270
