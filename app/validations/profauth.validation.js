const Joi = require('joi');
const { password } = require('./custom.validation');


const register = {
      body: Joi.object().keys({
      firstName: Joi.string().required().firstName,
      lastName: Joi.string().required().lastName,
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
     
    }),
  };


  
const login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };

  
const refreshTokens = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };
  
  const forgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }

  const resetPassword = {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
    body: Joi.object().keys({
      password: Joi.string().required().custom(password),
    }),
  };

  module.exports = {
    register,
    login,
    refreshTokens,
    forgotPassword,
    resetPassword,
  };