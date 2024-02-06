
const Joi = require('joi');

const marksValidationSchema = Joi.object({
  subject: Joi.string().required(),
  marks: Joi.number().required(),
});

module.exports = marksValidationSchema;
