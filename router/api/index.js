var categoryAPI = require('./category');
var urlDictionary = require('../urlDictionary');

module.exports = {
    initRouterForAPI: function (router) {
        
        router.route(`${urlDictionary.CATEGORY}`).post(categoryAPI.insertCategory)
                                                 .get(categoryAPI.findAllCategory);
        router.route(`${urlDictionary.TODO}`).post(categoryAPI.insertTodo)
                                             .get(categoryAPI.findByCategoryId)
    }
}