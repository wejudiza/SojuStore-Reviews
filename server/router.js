const router = require('express').Router();
const controller = require('./controller');
// Ratings & Reviews Controllers
const controllersRR = require('./controllers-rr.js');
const controllerRelated = require('./controllerRelated.js');

router
  .route('/')
  // to retrieve the list of products
  .get(controller.get)
  // post interactions
  .post(controller.postInteraction);

router
  .route('/cart')
  .get(controller.getAllCart)
  .post(controller.addCart);

/* --------------------
Ratings & Reviews: Liam
-------------------- */
// Post review by product_id
router
  .route('/reviews')
  .post(controllersRR.postReview);

// Gets product review by product_id
router
  .route('/reviews/:product_id')
  .get(controllersRR.getReview);

// Gets product review meta data by product_id
router
  .route('/reviews/meta/:product_id')
  .get(controllersRR.getReviewMeta);

// Puts record in reivews that the review was helpful (by review_id)
router
  .route('/reviews/:review_id/helpful')
  .put(controllersRR.putHelpful);

/// ///////Realated Products///////////

router
  .route('/:product_id')
  .get(controllerRelated.getRelatedProducts);

router
  .route('/product_id/:id')
  // to retrieve all product level information for a SPECIFIC product ID
  .get(controller.getProducts);

router
  .route('/styles/:id')
  // returns all styles available for the given product
  .get(controller.getProductStyles);

//////////Questions and Answers///////////

router
  .route('/qa/questions/:product_id')
  .get(controller.getQnA);

module.exports = router;
