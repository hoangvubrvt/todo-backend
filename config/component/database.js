'use strict'

var joi = require('joi');

const envVarsSchema = joi.object({
    DB_HOST: joi.string().default("localhost"),
    DB_PORT: joi.string().default("27017"),
    DB_NAME: joi.string().default("todo"),
    DB_USERNAME: joi.string().default(null),
    DB_PASSWORD: joi.string().default(null)
}).unknown().required();

const {
    error,
    value: envVars
} = joi.validate(process.env, envVarsSchema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    database: {
        URL: `mongodb://${envVars.DB_HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}`,
        USERNAME: envVars.DB_USERNAME,
        PASSWORD: envVars.DB_PASSWORD,
    }
}

module.exports = config;