const Joi = require("joi");

const schema = Joi.object({
  limit: Joi.number().integer().min(1).max(5000).default(5000),
  offset: Joi.number().integer().min(0).default(0),
});

exports.validateLectureQuery = (req, res, next) => {
  const { error, value } = schema.validate(req.query, { stripUnknown: true });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { limit, offset } = value;
  req.query = value;

  next();
};

const lectureBodySchema = Joi.object({
  name: Joi.string().max(255).required(),
  kuerzel: Joi.string().max(255).required() ,
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
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.body = value;
  next();
};
