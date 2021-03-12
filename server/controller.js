//require models
const getQnA = require('./apiQnA.js');
const getProd = require('./apiGET.js');

const controller = {
  // to retrive a list of ALL products
  get: (req, res) => {
    getProd.products.getProducts((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  // to retrieve all product level information for a SPECIFIC product ID
  getProducts: (req, res) => {
    getProd.products.getProductId(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  // to retrieve all styles available for the given product
  getProductStyles: (req, res) => {
    getProd.products.getProductStyles(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  // retrieve all products in the cart
  getAllCart: (req, res) => {
    getProd.cart.getCart((err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results);
    });
  },
  // adds a product to the cart
  addCart: (req, res) => {
    getProd.cart.addToCart(req, (err, results) => {
      if (err) res.status(404).send(err);
      else res.status(201).send(results);
    });
  },
  // post interactions
  // postInteraction: (req, res) => {
  //   getProd.interaction.postInter(req, (err, results) => {
  //     if (err) res.status(404).send(err);
  //     else res.status(201).send(results);
  //   });
  // },
/****************QnA methods ***************************/

   //retrieve questions from productId
   getQnA: (req, res) => {
    getQnA.getQnA(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  //post new question
  postQuestion: (req, res) => {
    console.log(req.body)
    getQnA.postQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //post new answer
  postAnswer: (req, res) => {
    getQnA.postAnswer(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //get new Answer
  getAnswers: (req, res) => {
    getQnA.getAnswers(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  reportAnswer: (req, res) => {
    getQnA.reportAnswer(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  reportQuestion: (req, res) => {
    getQnA.reportQuestion(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  voteHelpful: (req, res) => {
    getQnA.voteHelpful(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  voteQuestionHelpful: (req, res) => {
    getQnA.voteQuestionHelpful(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
};

module.exports = controller;
