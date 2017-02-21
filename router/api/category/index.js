
var getMethod = require('./get');
var postMethod = require('./post');

module.exports = {
    insertTodo: postMethod.insertTodo,
    insertCategory: postMethod.insertCategory,
    findByCategoryId: getMethod.findByCategoryId,
    findAllCategory: getMethod.findAllCategory
}