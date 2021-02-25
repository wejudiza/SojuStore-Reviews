const token = 'YOUR PAT'

module.exports.headers = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/',
  headers: {
    'User-Agent': 'request',
    'Authorization': `${token}`
  }
}