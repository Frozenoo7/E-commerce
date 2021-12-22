const routes = require('express').Router();
const {
  orderProducts,
  findAll,
  updateOne,
  cancelOrder,
  assignOrder,
} = require('../controllers/orderController');
const { jwtAuth } = require('../controllers/authController/authController');
const {
  userAuth,
  adminAuth,
} = require('../controllers/authController/rolesAuthController');

routes.post('/order-products', jwtAuth, userAuth, orderProducts);
routes.get('/', jwtAuth, userAuth, findAll);
routes.put('/update', jwtAuth, userAuth, updateOne);
routes.put('/cancel', jwtAuth, userAuth, cancelOrder);
routes.put('/assign', jwtAuth, adminAuth, assignOrder);

module.exports = routes;
