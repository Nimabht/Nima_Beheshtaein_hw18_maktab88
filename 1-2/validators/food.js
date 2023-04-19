import Joi from "joi";

export default (food) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "name must be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name must be at least {#limit} characters long",
      "string.max": "name must be at most {#limit} characters long",
      "any.required": "name is required",
    }),
    price: Joi.number().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
    }),
  });
  return schema.validate(food, { abortEarly: false });
};
