const Joi = require("joi");

const categoryValidation = (category) => {
  const categorySchema = Joi.object({
    category: Joi.string().required(),
  });
  return categorySchema.validate(category);
};

module.exports = {
  categoryValidation,
};
