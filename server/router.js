const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
    .get(controller.get)
    .post(controller.post)

router
  .route('/')
  .patch(controller.update)
  .delete(controller.delete)

router
  .route('/:id')
    .get(controller.getProducts)

router
  .route('/styles/:id')
    .get(controller.getProductStyles)

 module.exports = router;