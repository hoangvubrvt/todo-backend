var apiRouter = require('./api');
var urlDictionary = require('./urlDictionary');

module.exports = function (app) {
    var router = app.Router();
    apiRouter.initRouterForAPI(router);
    return router;
}