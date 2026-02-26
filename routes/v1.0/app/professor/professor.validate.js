const Joi = require("joi");
const APIError = require("../../../../utils/error");

const schema = Joi.object({
  limit: Joi.number().integer().min(1).max(200).default(50),
  offset: Joi.number().integer().min(0).default(0),
}).unknown(true);

exports.validateProfessorQuery = (req, res, next) => {
  const { error, value } = schema.validate(req.query, { stripUnknown: false });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.query = value;

  next();
};

const professorBodySchema = Joi.object({
  titel: Joi.string().max(255).optional(),
  name: Joi.string().max(255).required(),
  vorname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  telefonnummer: Joi.string().max(255).required(),
  vorliebeId: Joi.number().integer().positive().required(),
  dozenten_statusId: Joi.number().integer().positive().optional(),
  prio_bachelor: Joi.number().integer().positive().optional(),
  prio_master: Joi.number().integer().positive().optional(),
});

exports.validateProfessorBody = (req, res, next) => {
  const { error, value } = professorBodySchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.body = value;
  next();
};

const professorId = Joi.number().integer().positive().required();

exports.validateProfessorId = (req, res, next) => {
  const { error, value } = professorId.validate(req.params.id, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.params.id = value;
  next();
};

const filterValidations = Joi.object({
  term: Joi.string().optional().allow(""),
  vorliebeId: Joi.number().integer().positive().optional(),
  dozenten_statusId: Joi.number().integer().positive().optional(),
}).unknown(true);

exports.validateProfessorFilter = (req, res, next) => {
  const { error, value } = filterValidations.validate(req.query, {
    stripUnknown: false,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.query.term = value.term;
  req.query.vorliebeId = value.vorliebeId;
  req.query.dozenten_statusId = value.dozenten_statusId;
  next();
};
