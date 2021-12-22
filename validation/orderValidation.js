const Joi = require('joi');

const orderValidation = (order) => {
  const orderSchema = Joi.object({
    shipping_details: Joi.string().required(),
    product: Joi.string().required(),
  });
  return orderSchema.validate(order);
};

const updateOrderValidation = (order) => {
  const updateOrderschema = Joi.object({
    shipping_details: Joi.string().required(),
  });
  return updateOrderschema.validate(order);
};

const cancelOrAssignOrder = (order) => {
  const cancelOrOrder = Joi.object({
    status: Joi.string().required(),
  });
  return cancelOrOrder.validate(order);
};
module.exports = {
  orderValidation,
  updateOrderValidation,
  cancelOrAssignOrder,
};
