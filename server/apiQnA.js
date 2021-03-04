const axios = require('axios');
const config = require('./config.js');

const getQnA = (req, callback) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${req.params.product_id}&count=100`,
    headers: {
      headers: {
        'User-Agent': 'request',
        Authorization: `${config.token}`,
      },
    },
  };

  axios.get(options.url, options.headers)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

const postQuestion = (req, callback) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${req.params.product_id}`,
    headers: {
      headers: {
        'User-Agent': 'request',
        Authorization: `${config.token}`,
      },
    },
  };
  axios.post(options.url, req.body, options.headers)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err)
    })
}

const postAnswer = (req, callback) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/answers`,
    headers: {
      headers: {
        'User-Agent': 'request',
        Authorization: `${config.token}`,
      },
    },
  };
  axios.post(options.url, req.body, options.headers)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err)
    })
}
module.exports.getQnA = getQnA;
module.exports.postQuestion = postQuestion;
module.exports.postAnswer = postAnswer;
