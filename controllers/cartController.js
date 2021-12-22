const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {
  cartValidation,
  updateCartValidation,
} = require('../validation/cartValidation');

const addCart = async (req, res) => {
  try {
    const { error, value } = cartValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = {
      ...value,
      user: req.user.id,
    };
    const products = await Product.findById(data.product);
    console.log(products);
    if (products.stock <= 0) {
      return res.status(400).json({ message: 'Product out of stock' });
    }
    const moreThanFive = await Cart.find({
      product: data.product,
      user: data.user,
    });
    if (moreThanFive.length <= 4) {
      const cart = new Cart(data);
      await cart.save();
      return res.status(200).json(cart);
    }
    return res.status(400).json({
      message: 'More than five quantity of same product is not allowed',
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const findOne = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    res.json(err.message);
  }
};
const findAll = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user.id }).populate('product');
    console.log(carts);
    return res.status(200).json(carts);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    const data = { quantity: req.body.quantity };
    const { error, value } = updateCartValidation(data);
    if (error) return res.json(error.details[0].message);
    const cart = await Cart.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: value }
    );
    return res.status(200).json(cart);
  } catch (err) {
    res.json(err.message);
  }
};

const deleteOne = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    res.json(err.message);
  }
};
module.exports = { addCart, findOne, findAll, updateOne, deleteOne };
