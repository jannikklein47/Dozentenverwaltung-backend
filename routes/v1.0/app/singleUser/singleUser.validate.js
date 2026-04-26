const Joi = require("joi");
const APIError = require("../../../../utils/error");
const germanMessages = require("../../../../utils/joi.messages");

const usernameSchema = Joi.object({
  username: Joi.string().email().max(255).required().label("Nutzername"),
});

exports.validateUsernameBody = (req, res, next) => {
  const { error, value } = usernameSchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
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
    .pattern(/[0-9]/, "muss mindestens eine Zahl enthalten")
    .pattern(/[!@#$%^&*()-+]/, "muss mindestens ein Sonderzeichen enthalten")
    .pattern(/[A-Z]/, "muss mindestens einen Großbuchstaben enthalten")
    .required()
    .messages({
      "string.pattern.name": "Passwort {#name}",
    })
    .label("Passwort"),
  oldpassword: Joi.string().min(8).required(),
});

exports.validatePasswordBody = (req, res, next) => {
  const { error, value } = passwordSchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }
  req.body = value;
  next();
};
