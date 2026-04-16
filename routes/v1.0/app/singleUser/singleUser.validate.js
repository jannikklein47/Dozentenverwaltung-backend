const Joi = require("joi");
const APIError = require("../../../../utils/error");

const usernameSchema = Joi.object({
  username: Joi.string().email().max(255).required(),
});

exports.validateUsernameBody = (req, res, next) => {
  const { error, value } = usernameSchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }
  req.body = value;
  next();
};

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(/[0-9]/, "must contain at least one number")
    .pattern(/[!@#$%^&*()-+]/, "must contain at least one special character")
    .pattern(/[A-Z]/, "must contain at least one uppercase letter")
    .required()
    .messages({
      "string.pattern.name": "Password {#name}",
    }),
  oldpassword: Joi.string().min(8).required(),
});

exports.validatePasswordBody = (req, res, next) => {
  const { error, value } = passwordSchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }
  req.body = value;
  next();
};
