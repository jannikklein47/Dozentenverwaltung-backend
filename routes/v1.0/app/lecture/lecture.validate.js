const Joi = require("joi");
const APIError = require("../../../../utils/error");
const germanMessages = require("../../../../utils/joi.messages");

const schema = Joi.object({
  limit: Joi.number().integer().min(1).max(200).default(50),
  offset: Joi.number().integer().min(0).default(0),
}).unknown(true);

exports.validateLectureQuery = (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    stripUnknown: false,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.query = value;

  next();
};

const lectureBodySchema = Joi.object({
  name: Joi.string().max(255).required(),
  kuerzel: Joi.string().max(255).required(),
  semester: Joi.number().integer().min(1).max(12).required(),
  professorIds: Joi.array()
    .items(Joi.number().integer().positive())
    .min(1)
    .default([]),
  abschluss_typId: Joi.number().integer().positive().required(),
  vorlesung_statusId: Joi.number().integer().positive().required(),
});

exports.validateLectureBody = (req, res, next) => {
  const { error, value } = lectureBodySchema.validate(req.body, {
    stripUnknown: true,
    messages: germanMessages,
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
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.params.id = value;
  next();
};

const lectureId = Joi.number().integer().positive().required();

exports.validateLectureId = (req, res, next) => {
  const { error, value } = lectureId.validate(req.params.id, {
    stripUnknown: true,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.params.id = value;
  next();
};

const dozenten_lectureFilter = Joi.object({
  term: Joi.string().optional().allow(""),
  vorlesung_statusId: Joi.number().integer().positive().optional(),
  abschluss_typId: Joi.number().integer().positive().optional(),
  semester: Joi.number().integer().positive().optional(),
  gehalten_anId: Joi.number().integer().positive().optional(),
  vorliebeId: Joi.number().integer().positive().optional(),
  vorlaufzeit: Joi.string().valid("S", "4", "M").optional(),
}).unknown(true);

exports.validateProfessorLectureFilter = (req, res, next) => {
  const { error, value } = dozenten_lectureFilter.validate(req.query, {
    stripUnknown: false,
    messages: germanMessages,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.query = { ...req.query, ...value };
  next();
};

const lectureUpdateSchema = Joi.object({
  name: Joi.string().max(255),
  kuerzel: Joi.string().max(255),
  semester: Joi.number().integer().min(1).max(12),
  abschluss_typId: Joi.number().integer().positive(),
  vorlesung_statusId: Joi.number().integer().positive(),
});

exports.validateUpdateLectureBody = (req, res, next) => {
  const { error, value } = lectureUpdateSchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) {
    return next(APIError.errorValidation(error.message));
  }

  req.body = value;
  next();
};
