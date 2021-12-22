const Joi = require('joi');

const registerValidation = (user) => {
  const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().optional(),
  });
  return registerSchema.validate(user);
};

const loginValidation = (user) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return loginSchema.validate(user);
};
module.exports = {
  registerValidation,
  loginValidation,
};
