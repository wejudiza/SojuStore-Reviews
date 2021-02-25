//require models
const getQnA = require('./QnAGet.js');

const controller = {
  get: (req, res) => {
    getQnA.getQnA((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
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