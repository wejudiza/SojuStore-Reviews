//require models
const getProducts = require('./apiGET.js');

const controller = {
  get: (req, res) => {
    products.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },
  getProducts: (req, res) => {
    products.getProductId(req, (err, results) => {
      if (err) res.status(404).send(err)
      else res.status(200).send(results);
    })
  },
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