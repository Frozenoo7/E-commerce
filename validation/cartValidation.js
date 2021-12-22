const Joi = require('joi');

const cartValidation = (cart) => {
  const cartSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.string().required(),
  });
  return cartSchema.validate(cart);
};

const updateCartValidation = (cart) => {
  const updateCartSchema = Joi.object({
    quantity: Joi.string().required(),
  });
  return updateCartSchema.validate(cart);
};

module.exports = { cartValidation, updateCartValidation };
