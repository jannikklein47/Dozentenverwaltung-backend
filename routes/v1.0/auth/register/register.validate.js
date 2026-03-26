const Joi = require("joi");
const APIError = require("../../../../utils/error");

const registerSchema = Joi.object({
  username: Joi.string().email().max(255).required(),

  password: Joi.string()
    .min(8)
    .pattern(/[0-9]/, "must contain at least one number")
    .pattern(/[!@#$%^&*()-+]/, "must contain at least one special character")
    .pattern(/[A-Z]/, "must contain at least one uppercase letter")
    .required()
    .messages({
      "string.pattern.name": "Password {#name}",
    }),
});

exports.validateRegisterBody = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }
  req.body = value;
  next();
};
