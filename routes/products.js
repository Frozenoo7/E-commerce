const routes = require('express').Router();
const { jwtAuth } = require('../controllers/authController/authController');
const {
  adminAuth,
} = require('../controllers/authController/rolesAuthController');
const {
  createProduct,
  findOne,
  findAll,
  searchAll,
  updateOne,
  deleteOne,
} = require('../controllers/productsController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const upload = multer({ storage: storage });

routes.post(
  '/add',
  jwtAuth,
  adminAuth,
  upload.array('picture', 4),
  createProduct
);
routes.get('/:id', findOne);
routes.post('/show', findAll);
routes.post('/search', searchAll);
routes.put('/:id', jwtAuth, adminAuth,upload.array('picture',4), updateOne);
routes.delete('/:id', jwtAuth, adminAuth, deleteOne);

module.exports = routes;
