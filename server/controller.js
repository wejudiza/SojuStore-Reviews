//require models
const getQnA = require('./QnAGet.js');
const getProd = require('./apiGET.js');

const controller = {
  // to retrive a list of ALL products
  get: (req, res) => {
    products.getProducts((err, results) => {
      if (err) res.status(404).send(err)
      else res.status(200).send(results);
    })
  },
  // to retrieve all product level information for a SPECIFIC product ID
  getProducts: (req, res) => {
    products.getProductId(req, (err, results) => {
      if (err) res.status(404).send(err)
      else res.status(200).send(results);
    })
  },
  // to retrieve all styles available for the given product
  getProductStyles: (req, res) => {
    products.getProductStyles(req, (err, results) => {
      if (err) res.status(404).send(err)
      else res.status(200).send(results);
    })
  },
  getQnA: (req, res) => {
    getQnA.getQnA(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  // retrieve all products in the cart
  getAllCart: (req, res) => {
    cart.getCart((err, results) => {
      if (err) res.status(404).send(err)
      else res.status(200).send(results);
    })
  },
  // adds a product to the cart
  addCart: (req, res) => {
    cart.addToCart(req, (err, results) => {
      if (err) res.status(404).send(err)
      else res.status(201).send('Success!')
    })
  },
  //post interactions
  postInteraction: (req, res) => {
    interaction.postInter(req, (err, results) => {
      if (err) res.status(404).send(err)
      else res.status(201).send(results)
    })
  }
}

module.exports = controller