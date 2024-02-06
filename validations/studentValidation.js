
const Joi = require('joi');

const studentValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dialCode: Joi.string().required(),
  phoneNo: Joi.number().required(),
  password:Joi.string().required()
});

module.exports = studentValidationSchema;
