const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createprofessional = {
  body: Joi.object().keys({
    firstName: Joi.string().required().firstName(),
    lastName: Joi.string().required().lastName(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
   
   
  }),
};
const getprofessional = {
    params: Joi.object().keys({
      profId: Joi.string().custom(objectId),
    }),
  };

module.exports = {
    createprofessional,
    getprofessional,
}