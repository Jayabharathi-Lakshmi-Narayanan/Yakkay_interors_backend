const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Load the correct .env file based on the NODE_ENV
dotenv.config({
  path: path.join(__dirname, process.env.NODE_ENV === 'production' ? "../.env.production" : "../.env")
});

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  ENDUSER_STOREAPP_URL: Joi.string().required(), // Application URL
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  app: {
    url: envVars.ENDUSER_STOREAPP_URL,
  },
};
