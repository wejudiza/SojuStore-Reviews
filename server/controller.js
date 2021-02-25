//require models
const getProducts = require('./apiGET.js');

const controller = {
  // to retrive a list of ALL products
  get: (req, res) => {
    products.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
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
  post: (req, res) => {
    res.send('post')
  },
  update: (req, res) => {
    res.send('update')
  },
  delete: (req, res) => {
    res.send('delete')
  }
}

module.exports = controller