var rootPath = require('app-root-path');
var Category = require(`${rootPath.path}/model`).Category;
var responseUtil = require(`${rootPath.path}/util`).ResponseUtil;
var logger = require(`${rootPath.path}/logger`);
var util = require('util');

function insertCategory(req, res) {
    Category.create({
        categoryId: req.body.key,
        categoryTitle: req.body.title
    }).then(data => {
        var category = {
            key: data.categoryId,
            title: data.categoryTitle,
            todos: data.todos
        }
        responseUtil.sendSuccessResponse(res, category);
    }).catch(err => {
        logger.error(err.message, err);
        responseUtil.sendErrorResponse(res, err.message);
    });
}

function insertTodo(req, res) {
    var id = req.query.category;
    var todo = {
        title: req.body.title,
        description: req.body.description
    }

    if (id === '' || util.isNullOrUndefined(id)) {
        return responseUtil.sendFailResponse(res, 'Category Id is required');
    }

    var category = new Category({
        categoryId: id
    });

    category.addTodo(todo).then(function savedData(data) {
        if (data) {
            let todos = data.todos;

            responseUtil.sendSuccessResponse(res, {
                todos: todos.map(function (todo, index) {
                    return {
                        title: todo.title,
                        description: todo.description,
                        created_at: todo.createdAt
                    }
                })
            });
        } else {
            responseUtil.sendFailResponse(res, `Can not find '${id}' category in database`);
        }

    }).catch(function (err) {
        logger.error(err.message, err);
        responseUtil.sendErrorResponse(res, err.message, err);
    });;
};

module.exports = {
    insertTodo: insertTodo,
    insertCategory: insertCategory
};