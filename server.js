const env = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const products = require('./routes/products');
const category = require('./routes/category');
const cart = require('./routes/cart');
const order = require('./routes/order');
env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', user);
app.use('/products', products);
app.use('/category', category);
app.use('/cart', cart);
app.use('/order', order);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('database connected successfully'));

app.listen(process.env.DB_PORT || 3000);
