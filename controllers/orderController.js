const Order = require('../models/Order');
const Product = require('../models/Product');
const {
  orderValidation,
  updateOrderValidation,
  cancelOrAssignOrder,
} = require('../validation/orderValidation');

const orderProducts = async (req, res) => {
  try {
    const { error, value } = orderValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const data = {
      ...value,
      user: req.user.id,
    };
    const products = await Product.findById(value.product);
    if (products.stock < 1) {
      return res.status(400).json({ message: 'Product out of stock' });
    }
    const order = new Order(data);
    await order.save();
    const changeStock = await Product.findOneAndUpdate(
      { _id: req.body.product },
      { stock: products.stock - 1 },
      { new: true, upsert: true }
    );
    return res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('product');
    return res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    const { error, value } = updateOrderValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const orderUpdate = await Order.findOne({ user: req.user.id });
    const order = await Order.findOneAndUpdate(
      { order_id: orderUpdate.order_id },
      { $set: { shipping_details: value.shipping_details } }
    );
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const data = { status: req.body.status };
    const { error, value } = cancelOrAssignOrder(data);
    if (error) return res.status(400).json(error.details[0].message);
    const cancel = await Order.findOne({ order_id: req.body.order_id });
    if (cancel.status === 'assign') {
      return res.status(400).json({ message: 'You cannot cancel order' });
    }
    const changeOrder = await Order.findOneAndUpdate(
      { order_id: req.body.order_id },
      { $set: value }
    );
    return res.json(changeOrder);
    // return res.status(200).json({ message: 'Your order has been cancelled' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const assignOrder = async (req, res) => {
  try {
    const data = { status: req.body.status };
    const { error, value } = cancelOrAssignOrder(data);
    if (error) return res.status(400).json(error.details[0].message);
    const order = await Order.findOne({ order_id: req.body.order_id });
    if (order.status === 'assign') {
      return res.status(400).json({ message: 'Order already assigned' });
    } else if (order.status === 'cancel') {
      return res.status(400).json({ message: 'Order already cancelled' });
    } else {
      const assignOrder = await Order.findOneAndUpdate(
        { order_id: req.body.order_id },
        { $set: value }
      );
      res.json(assignOrder);
      // return res.status(200).json({ message: 'Order has bed assigned' });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  orderProducts,
  findAll,
  updateOne,
  cancelOrder,
  assignOrder,
};
