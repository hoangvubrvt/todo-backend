module.exports = require('./database').connect(() => {
    var express = require('express');
    var bodyParser = require('body-parser');
    var middleWare = require('./middleware');
    var router = require('./router')(express);
    var logger = require('./logger');
    var {
        server: serverConfig
    } = require('./config');
    var app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(router);
    app.use(middleWare.serverError);
    app.listen(serverConfig.PORT, function (error) {
        if (error) {
            logger.error(`Can not start server on port: ${serverConfig.PORT}`, error);
            process.exit(0);
        }
        return logger.info(`Server is running on port: ${serverConfig.PORT}`);
    });
});