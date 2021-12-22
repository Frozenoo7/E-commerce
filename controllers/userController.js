const User = require('../models/User');
const { registerValidation } = require('../validation/userValidation');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const user = await User.findOne({ email: value.email });
    if (user) return res.status(400).json({ message: 'User already exist' });
    const newUser = new User({
      name: value.name,
      email: value.email,
      password: await bcrypt.hash(value.password, 10),
      role: value.role,
    });
    await newUser.save();
    return res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (err) {}
};
const findAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = {
  createUser,
  findOne,
  findAll,
  deleteUser,
};
