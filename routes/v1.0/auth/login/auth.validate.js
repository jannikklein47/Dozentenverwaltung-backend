const Joi = require("joi");
const APIError = require("../../../../utils/error");
const germanMessages = require("../../../../utils/joi.messages");

const loginschema = Joi.object({
  username: Joi.string().min(3).max(254).required(),
  password: Joi.string().min(6).max(128).required(),
}).unknown(true);

exports.validateLogin = (req, res, next) => {
  const { error, value } = loginschema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorWrongCredentials());
  }

  req.body = value;
  next();
};

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().hex().length(128).required(),
}).unknown(true);

exports.validateRefreshToken = (req, res, next) => {
  const { error, value } = refreshTokenSchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message.replaceAll('"', "")));
  }

  req.body = value;
  next();
};

const logoutSchema = Joi.object({
  all: Joi.string().valid("true", "false").default("false"),
}).unknown(true);

const logoutBodySchema = Joi.object({
  refreshToken: Joi.string().hex().length(128).optional(),
}).unknown(true);

exports.validateLogout = (req, res, next) => {
  const { error, value } = logoutBodySchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message.replaceAll('"', "")));
  }
  const { error: queryError, value: queryValue } = logoutSchema.validate(
    req.query,
    {
      stripUnknown: true,
      messages: germanMessages,
    },
  );
  if (queryError) {
    return next(APIError.errorValidation(error.message.replaceAll('"', "")));
  }
  req.body = value;
  req.query = queryValue;
  next();
};

const changeInitialPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(/[0-9]/, "muss mindestens eine Zahl enthalten")
    .pattern(/[!@#$%^&*()-+]/, "muss mindestens ein Sonderzeichen enthalten")
    .pattern(/[A-Z]/, "muss mindestens einen Großbuchstaben enthalten")
    .required()
    .messages({
      "string.pattern.name": "Passwort {#name}",
    }),
  refreshToken: Joi.string().hex().length(128).required(),
}).concat(refreshTokenSchema);

exports.validateChangeInitialPassword = (req, res, next) => {
  const { error, value } = changeInitialPasswordSchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message.replaceAll('"', "")));
  }
  req.body = value;
  next();
};
