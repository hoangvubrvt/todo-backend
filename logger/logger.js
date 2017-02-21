const winston = require('winston');
var rootPath = require('app-root-path');
var fs = require('fs');
var moment = require('moment');
const {
    logger: logConfig
} = require(`${rootPath.path}/config`);

var timeFormatOptions = {
    hour12: false,
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
}

var consoleTransport = new(winston.transports.Console)({
    timestamp: function () {
        return Date.now();
    },
    formatter: function (options) {
        let date = new Date(options.timestamp());
        let timeFormat = date.toLocaleString('es-US', timeFormatOptions);
        return `${timeFormat} ${options.level.toUpperCase()} ${(options.message ? options.message : '')} ${
                        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )}`;
    }
});

function getLogFileName() {
    let logDirectory = logConfig.logFileDirectory;
    if(!fs.existsSync(logDirectory)){
        fs.mkdirSync(logDirectory);
    }
    return `${logDirectory}/${moment().format('DD-MM-YYYY')}.log`;
}

var fileTransport = new(winston.transports.File)({
    filename: getLogFileName(),
    timestamp: function () {
        return Date.now();
    },
    formatter: function (options) {
        let timeFormat = new Date(options.timestamp()).toLocaleString('es-US', timeFormatOptions);
        return `${timeFormat} ${options.level.toUpperCase()} ${(options.message ? options.message : '')} ${
                        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )}`;
    },
    json: false
});

var logger = new winston.Logger({
    level: logConfig.level,
    transports: [consoleTransport, fileTransport]
});

logger.handleExceptions([consoleTransport, fileTransport]);
logger.exitOnError = false;

if (!logConfig.enabled) {
    logger.remove(winston.transports.Console);
}

module.exports = logger;