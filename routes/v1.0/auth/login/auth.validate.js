const Joi = require("joi");
const APIError = require("../../../../utils/error");

const loginschema = Joi.object({
  username: Joi.string().min(3).max(254).required(),
  password: Joi.string().min(6).max(128).required(),
}).unknown(true);

exports.validateLogin = (req, res, next) => {
  const { error, value } = loginschema.validate(req.body, {
    stripUnknown: true,
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
  });
  if (error) {
    return next(APIError.errorUnknown());
  }

  req.body = value;
  next();
};

const logoutSchema = Joi.object({
  all: Joi.boolean().default(false),
}).unknown(true);

exports.validateLogout = (req, res, next) => {
  const { error, value } = refreshTokenSchema.validate(req.body, {
    stripUnknown: true,
  });
  const { queryerror, queryvalue } = logoutSchema.validate(req.query, {
    stripUnknown: true,
  });
  if (error || queryerror) {
    return next(APIError.errorUnknown());
  }
  req.body = value;
  req.query = queryvalue;
  next();
};
