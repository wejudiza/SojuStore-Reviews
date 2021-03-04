//require models
const getQnA = require('./apiQnA.js');
const getProd = require('./apiGET.js');

const controller = {
  // to retrive a list of ALL products
  get: (req, res) => {
    getProd.products.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
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
    getProd.products.getProductStyles(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },

  //retrieve questions from productId
  getQnA: (req, res) => {
    getQnA.getQnA(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  //post new question
  postQuestion: (req, res) => {
    getQnA.postQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //post new answer
  postAnswer: (req, res) => {
    getQnA.postAnswer(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
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
