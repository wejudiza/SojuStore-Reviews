const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
    // to retrieve the list of products
    .get(controller.get)
    .post(controller.post)

router
  .route('/')
  .patch(controller.update)
  .delete(controller.delete)

router
  .route('/:id')
    // to retrieve all product level information for a SPECIFIC product ID
    .get(controller.getProducts)

router
  .route('/styles/:id')
  // to retrieve all styles available for the given product
    .get(controller.getProductStyles)

 module.exports = router;