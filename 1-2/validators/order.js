import Joi from "joi";

export default (order) => {
  const schema = Joi.object({
    studentId: Joi.string().required().messages({
      "string.base": "Student id must be a string",
      "string.empty": "Student id cannot be empty",
      "any.required": "Student id is required",
    }),
    foodIds: Joi.array().min(1).required().messages({
      "any.required":
        "Food Ids is required and must have at least one ID",
      "array.min": "Food Ids must have at least one ID",
    }),
    transactionCode: Joi.string().length(12).required().messages({
      "string.base": "transactionCode must be a string",
      "string.length":
        "transactionCode must be exactly 12 characters long",
      "any.required": "transactionCode is required",
    }),
  });
  return schema.validate(order, { abortEarly: false });
};
