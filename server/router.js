const router = require('express').Router();
const controller = require('./controller');
const controllerRelated = require('./controllerRelated.js')

router
  .route('/')
  // .get(controller.get)
  .post(controller.post)
  .get(controllerRelated.getRelatedProducts)


router
  .route('/')
  .patch(controller.update)
  .delete(controller.delete)

  router
  .route('/:product_id')
  .get(controllerRelated.getRelatedProducts)



module.exports = router;