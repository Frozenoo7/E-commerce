const routes = require('express').Router();
const {
  addCart,
  findAll,
  updateOne,
  deleteOne,
  findOne,
} = require('../controllers/cartController');
const { jwtAuth } = require('../controllers/authController/authController');
const {
  userAuth,
} = require('../controllers/authController/rolesAuthController');

routes.post('/add-cart', jwtAuth, userAuth, addCart);
routes.get('/:id', jwtAuth, userAuth, findOne);
routes.get('/', jwtAuth, userAuth, findAll);
routes.put('/', jwtAuth, userAuth, updateOne);
routes.delete('/:id', jwtAuth, userAuth, deleteOne);

module.exports = routes;
