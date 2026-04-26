const Joi = require("joi");
const APIError = require("../../../../utils/error");
const germanMessages = require("../../../../utils/joi.messages");

const validateUserBody = Joi.object({
  username: Joi.string().min(3).max(254).required(),
  role: Joi.string().valid("Admin", "User").required(),
});

exports.validateUserBody = (req, res, next) => {
  const { error, value } = validateUserBody.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.body = value;
  next();
};

exports.validateUserParams = (req, res, next) => {
  const { error, value } = Joi.number()
    .integer()
    .positive()
    .required()
    .validate(req.params.id, {
      stripUnknown: true,
      messages: germanMessages,
    });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.params.id = value;
  next();
};
