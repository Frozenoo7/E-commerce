const routes = require('express').Router();
const {
  createUser,
  findAll,
  findOne,
  deleteUser,
} = require('../controllers/userController');
const {
  login,
  jwtAuth,
} = require('../controllers/authController/authController');
const {
  adminAuth,
  userOrAdminAuth,
} = require('../controllers/authController/rolesAuthController');

routes.post('/register', createUser);
routes.post('/login', login);
routes.get('/:id', findOne);
routes.get('/', jwtAuth, adminAuth, findAll);
routes.delete('/:id', jwtAuth, userOrAdminAuth, deleteUser);

module.exports = routes;
