import Joi from "joi";

let signUpValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(10).required(),

  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  age: Joi.number().min(5).max(40),
  gender: Joi.string(),
  phone: Joi.string(),
});

let signInSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export { signUpValidationSchema, signInSchema };
