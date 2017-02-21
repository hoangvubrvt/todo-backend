'use strict'

var joi = require('joi');

const envVarsSchema = joi.object({
    PORT: joi.number().default(8081)
}).unknown().required();

const {
    error,
    value: envVars
} = joi.validate(process.env, envVarsSchema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    server: {
        PORT: envVars.PORT
    }
}

module.exports = config;