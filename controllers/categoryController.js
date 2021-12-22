const Category = require('../models/Category');
const { categoryValidation } = require('../validation/categoryValidation');

const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const category = new Category(value);
    await category.save();
    return res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findOne = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json(category);
  } catch (err) {
    res.json(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: value }
    );
    return res.status(200).json(category);
  } catch (err) {
    res.json(err.message);
  }
};

const deleteOne = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.json(err.message);
  }
};
module.exports = {
  createCategory,
  findOne,
  updateOne,
  deleteOne,
};
