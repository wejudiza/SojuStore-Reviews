const router = require('express').Router();
const controller = require('./controller');
// Ratings & Reviews Controllers
const controllersRR = require('./controllers-rr.js');
const controllerRelated = require('./controllerRelated.js')


router
  .route('/')
    // to retrieve the list of products
    .get(controller.get)
    .post(controller.post)

router
  .route('/')
  .patch(controller.update)
  .delete(controller.delete)

/* ---------------------
Ratings & Reviews - Liam
--------------------- */
router
  .route('/reviews/:product_id')
  .get(controllersRR.get)

//////////Realated Products///////////

router
  .route('/:product_id')
  .get(controllerRelated.getRelatedProducts)



router
  .route('/:id')
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
