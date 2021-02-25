const token = 'YOUR PAT'

module.exports = {
  headers: {
    'User-Agent': 'request',
    'Authorization': `token ${token}`
  }
}