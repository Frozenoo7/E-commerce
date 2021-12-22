const User = require('../../models/User');

const adminVerify = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

const customerAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.role !== 'customers') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const userOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.role);
    if (user.role === 'customers') {
      return customerAuth(req, res, next);
    }
    if (user.role === 'admin') {
      return adminVerify(req, res, next);
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
module.exports = {
  adminAuth: adminVerify,
  userAuth: customerAuth,
  userOrAdminAuth: userOrAdmin,
};
