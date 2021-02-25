const token = 'YOUR PAT'

module.exports = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax',
  headers: {
    headers: {
    'User-Agent': 'request',
    'Authorization': `${token}`
    }
  },
  token: token
}