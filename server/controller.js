//require models
const getProducts = require('./apiGET.js');

const controller = {
  get: (req, res) => {
    getProducts.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
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