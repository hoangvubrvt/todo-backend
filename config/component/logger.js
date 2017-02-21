'use strict'

const joi = require('joi');
var rootPath = require('app-root-path');
const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true),
  LOGGER_DIRECTORY: joi.string().default(`${rootPath.path}/logs`)
}).unknown().required();

const {
  error,
  value: envVars
} = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED,
    logFileDirectory: envVars.LOGGER_DIRECTORY,
  }
};

module.exports = config;