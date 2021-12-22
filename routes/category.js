const routes = require('express').Router();
const { jwtAuth } = require('../controllers/authController/authController');
const {
  createCategory,
  findOne,
  updateOne,
  deleteOne,
} = require('../controllers/categoryController');
const {
  adminAuth,
} = require('../controllers/authController/rolesAuthController');

routes.post('/', jwtAuth, adminAuth, createCategory);
routes.get('/:id',jwtAuth,adminAuth, findOne);
routes.put('/:id',jwtAuth,adminAuth, updateOne);
routes.delete('/:id',jwtAuth,adminAuth, deleteOne);

module.exports = routes;
