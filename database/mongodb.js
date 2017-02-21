var mongoose = require('mongoose');
var bluebirdPromise = require('bluebird');
const {
    database: dbConfig
} = require('../config');
var logger = require('../logger');

function connectDatabase(cb) {
    const URL = dbConfig.URL;
    var connectOptions = {
        user: dbConfig.USERNAME,
        pass: dbConfig.PASSWORD,
        promiseLibrary: bluebirdPromise,
        server: {
            auto_reconnect: true,
            reconnectTries: 50,
            socketOptions: {
                keepAlive: 120
            }
        }
    };
    mongoose.Promise = bluebirdPromise;
    mongoose.connection.on('connected', function () {
        logger.info(`Mongoose default connection is connected`);
    });
    mongoose.connection.on('reconnected', function () {
        logger.info(`Mongoose reconnected server`);
    });
    mongoose.connection.on('error', function (err) {
        logger.error('Mongoose default connection error', err);
        gracefulExit();
    });
    mongoose.connection.on('disconnected', function () {
        logger.warn('Mongoose default connection disconnected');
    });

    function gracefulExit() {
        mongoose.connection.close(function () {
            logger.warn('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }
    //Terminate connection when stop node server
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    if (mongoose.isMocked) {
        mongoose.connect('mongodb://localhost/TestingDB').then(() => {
            cb();
        }).catch((err) => {
            logger.error('Failed to connect to mongo on startup', err);
            throw err;
        });
    } else {
        mongoose.connect(URL, connectOptions, function (err) {
            if (err) {
                logger.error('Failed to connect to mongo on startup', err);
                throw err;
            }
            logger.info('Connect database successful');
            cb();
        });
    }
}
module.exports = {
    connect: connectDatabase
};