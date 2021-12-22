const Joi = require('joi');

const createValidation = (products) => {
  const productsSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    color: Joi.string().required(),
    description: Joi.string().required(),
    size: Joi.string().required(),
    stock: Joi.number().required(),
    material: Joi.string().required(),
    category: Joi.string().required(),
  });
  return productsSchema.validate(products, { abortEarly: false });
};

const serachValidation = (search) => {
  const searchSchema = Joi.object({
    search: Joi.string().required(),
  });
  return searchSchema.validate(search);
};

module.exports = {
  createValidation,
  serachValidation,
};
