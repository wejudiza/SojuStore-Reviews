//require models

const controller = {
  get: (req, res) => {
    res.send('get')
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