const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { loginValidation } = require('../../validation/userValidation');
const login = async (req, res) => {
  try {
    const { value, error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const user = await User.findOne({ email: value.email });
    if (!user) return res.json({ message: 'User not found' });
    if (user && (await bcrypt.compare(value.password, user.password))) {
      const data = { id: user.id, name: user.name };
      const accessToken = jwt.sign(data, 'qwert');
      res.json(accessToken);
    } else {
      return res.status(400).json({ message: 'password wrong' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// verify token
const verifyToken = (req, res, next) => {
  try {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) return res.status(401).json({ message: 'Unauthorized' });
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, 'qwert', (error, user) => {
      if (error) return res.status(401).json({ message: 'Unauthorized ' });
      req.user = user;
      next();
    });
  } catch (err) {
    res.json({ message: err.message });
    console.log(err);
  }
};

module.exports = {
  jwtAuth: verifyToken,
  login,
};
