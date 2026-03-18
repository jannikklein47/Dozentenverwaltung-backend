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
