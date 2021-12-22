const Product = require('../models/Product');
const {
  createValidation,
  serachValidation,
} = require('../validation/productsValidation');

const createProduct = async (req, res) => {
  try {
    const { error, value } = createValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    let data = {
      ...value,
    };

    if (req.files) {
      let fileNames = [];
      req.files.forEach((el) => fileNames.push(el.filename));
      data = { ...data, picture: fileNames };
      console.log(fileNames);
    }
    const newProducts = new Product(data);
    await newProducts.save();
    return res.status(200).json(newProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findOne = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    res.json(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    if (req.body.sort === 'low-high') {
      products.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (req.body.sort === 'high-low') {
      products.sort((a, b) => {
        return b.price - a.price;
      });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const searchAll = async (req, res) => {
  try {
    const { error, value } = serachValidation(req.body);
    if (error) return res.json(error.details[0].message);
    const products = await Product.find({ name: req.body.search });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    const { error, value } = createValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    let data = {};
    let filesNames = [];
    if (req.files) {
      req.files.forEach((file) => filesNames.push(file.filename));
      data = { ...value, picture: filesNames };
    }
    console.log(data);
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data }
    );
    console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    res.json(err.message);
    console.log(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    return res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  createProduct,
  findAll,
  searchAll,
  findOne,
  updateOne,
  deleteOne,
};
