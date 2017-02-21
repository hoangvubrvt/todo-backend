'use strict'

var databaseConfig = require('./component/database');
var logConfig = require('./component/logger');
var serverConfig = require('./component/server');

module.exports = Object.assign({}, databaseConfig, logConfig, serverConfig);