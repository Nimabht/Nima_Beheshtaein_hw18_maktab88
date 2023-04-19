import Joi from "joi";

export default {
  validateUserForSignup: (user) => {
    const schema = Joi.object({
      firstname: Joi.string().min(2).max(50).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name cannot be empty",
        "string.min":
          "First name must be at least {#limit} characters long",
        "string.max":
          "First name must be at most {#limit} characters long",
        "any.required": "First name is required",
      }),
      lastname: Joi.string().min(2).max(50).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name cannot be empty",
        "string.min":
          "Last name must be at least {#limit} characters long",
        "string.max":
          "Last name must be at most {#limit} characters long",
        "any.required": "Last name is required",
      }),
      username: Joi.string()
        .min(4)
        .max(255)
        .lowercase()
        .required()
        .messages({
          "string.base": "Username must be a string",
          "string.empty": "Username cannot be empty",
          "string.min":
            "Username must be at least {#limit} characters long",
          "string.max":
            "Username must be at most {#limit} characters long",
          "any.required": "Username is required",
        }),
      password: Joi.string()
        .min(8)
        .max(255)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.pattern.base":
            "Password must be at least 8 characters long and contain only letters and digits",
          "string.min":
            "Password must be at least {#limit} characters long",
          "string.max":
            "Password must be at most {#limit} characters long",
          "any.required": "Password is required",
        }),
      repeat_password: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only":
            "password confirmation and password don't match ",
        }),
      gender: Joi.string()
        .min(3)
        .max(50)
        .valid("man", "woman")
        .default("not-set")
        .messages({
          "string.base": "Gender must be a string",
          "string.min":
            "Gender must be at least {#limit} characters long",
          "string.max":
            "Gender must be at most {#limit} characters long",
        }),
      role: Joi.string()
        .valid("user", "admin")
        .default("user")
        .messages({
          "any.only": 'Role must be "user" or "admin"',
        }),
      registrationDate: Joi.date().forbidden().messages({
        "any.unknown": "Registration date cannot be set",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  },
  validateUserForUpdate: (user) => {
    const schema = Joi.object({
      firstname: Joi.string().min(2).max(50).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name cannot be empty",
        "string.min":
          "First name must be at least {#limit} characters long",
        "string.max":
          "First name must be at most {#limit} characters long",
        "any.required": "First name is required",
      }),
      lastname: Joi.string().min(2).max(50).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name cannot be empty",
        "string.min":
          "Last name must be at least {#limit} characters long",
        "string.max":
          "Last name must be at most {#limit} characters long",
        "any.required": "Last name is required",
      }),
      username: Joi.string()
        .min(4)
        .max(255)
        .lowercase()
        .required()
        .messages({
          "string.base": "Username must be a string",
          "string.empty": "Username cannot be empty",
          "string.min":
            "Username must be at least {#limit} characters long",
          "string.max":
            "Username must be at most {#limit} characters long",
          "any.required": "Username is required",
        }),
      gender: Joi.string()
        .min(3)
        .max(50)
        .valid("man", "woman", "not-set")
        .default("not-set")
        .messages({
          "string.base": "Gender must be a string",
          "string.min":
            "Gender must be at least {#limit} characters long",
          "string.max":
            "Gender must be at most {#limit} characters long",
        }),
      role: Joi.string()
        .valid("user", "admin")
        .default("user")
        .messages({
          "any.only": 'Role must be "user" or "admin"',
        }),
      registrationDate: Joi.date().forbidden().messages({
        "any.unknown": "Registration date cannot be set",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  },
  validateResetPassword: (info) => {
    const schema = Joi.object({
      currentPassword: Joi.string().required().messages({
        "any.required": "Current password is required",
      }),
      newPassword: Joi.string()
        .min(8)
        .max(255)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.pattern.base":
            "Password must be at least 8 characters long and contain only letters and digits",
          "string.min":
            "Password must be at least {#limit} characters long",
          "string.max":
            "Password must be at most {#limit} characters long",
          "any.required": "Password is required",
        }),
      repeatPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
          "any.only":
            "password confirmation and password doesn't match ",
        }),
    });
    return schema.validate(info, { abortEarly: false });
  },
};
