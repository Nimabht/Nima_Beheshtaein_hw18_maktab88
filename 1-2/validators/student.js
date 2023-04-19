import Joi from "joi";

export default (student) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least {#limit} characters long",
      "string.max": "First name must be at most {#limit} characters long",
      "any.required": "First name is required",
    }),
    lastname: Joi.string().min(3).max(30).required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name cannot be empty",
      "string.min": "Last name must be at least {#limit} characters long",
      "string.max": "Last name must be at most {#limit} characters long",
      "any.required": "Last name is required",
    }),
    gender: Joi.string().valid("man", "woman").required().messages({
      "string.base": "Gender must be a string",
      "any.only": 'Gender must be "man" or "woman"',
      "any.required": "Gender is required",
    }),
    studentCode: Joi.string().length(9).pattern(/^[^0]/).required().messages({
      "string.base": `Student code must be a string`,
      "string.empty": `Student code cannot be empty`,
      "string.length": `Student code must be exactly 9 characters long`,
      "string.pattern.base": `Student code cannot start with 0`,
      "any.required": `Student code is required`,
    }),
  });
  return schema.validate(student, { abortEarly: false });
};
