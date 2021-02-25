const router = require('express').Router();
const controller = require('./controller');
const controllerRelated = require('./controllerRelated.js')


router
  .route('/')
    // to retrieve the list of products
    .get(controller.get)
    //post interactions
    .post(controller.postInteraction)

router
  .route('/cart')
    .get(controller.getAllCart)
    .post(controller.addCart)


//////////Realated Products///////////

router
  .route('/:product_id')
  .get(controllerRelated.getRelatedProducts)

router
  .route('/product_id/:id')
    // to retrieve all product level information for a SPECIFIC product ID
    .get(controller.getProducts)

router
  .route('/styles/:id')
  // to retrieve all styles available for the given product
    .get(controller.getProductStyles)

router
  .route('/qa/questions/:product_id')
  .get(controller.getQnA)

module.exports = router;
