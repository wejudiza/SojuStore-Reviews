const router = require('express').Router();
const controller = require('./controller');
// Ratings & Reviews Controllers
const controllersRR = require('./controllers-rr.js');

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route('/')
  .patch(controller.update)
  .delete(controller.delete)

// Routes for Ratings & Reviews
router
  .route('/')
  .get(controllersRR.get(req))


module.exports = router;