var rootPath = require('app-root-path');
var responseUtil = require(`${rootPath.path}/util`).ResponseUtil;
var CategoryModel = require(`${rootPath.path}/model`).Category;
var logger = require(`${rootPath.path}/logger`);
var util = require('util');

function findByCategoryId(req, res) {
    try {
        var categoryId = req.query.category;
        if (categoryId === '' || util.isNullOrUndefined(categoryId)) {
            return responseUtil.sendFailResponse(res, 'Category name is required');
        }

        CategoryModel.findByCategoryId(categoryId).then(value => {
            if (!value) {
                return responseUtil.sendFailResponse(res, `Can not found '${categoryId}' category`);
            }
            var responseData = {
                key: value.categoryId,
                todos: value.todos.map(function (todo) {
                    return {
                        title: todo.title,
                        description: todo.description,
                        created_at: todo.createdAt
                    }
                })
            }
            
            responseUtil.sendSuccessResponse(res, responseData);

        }).catch(err => {
            logger.error(err.message, err);
            responseUtil.sendErrorResponse(res, err.message, err);
        });
    } catch (err) {
        logger.error(err.message, err);
        responseUtil.sendErrorResponse(res, err.message, err);
    }
}

function findAllCategory(req, res) {
    CategoryModel.find({}).then(datas => {
        var responseData = datas.map(function(data){
            return {
                key: data.categoryId,
                title: data.categoryTitle
            }
        });

        responseUtil.sendSuccessResponse(res, {
            categories: responseData
        });
    }).catch(err => {
        logger.error(err.message, err);
        responseUtil.sendErrorResponse(res, err.message);
    });
}

module.exports = {
    findByCategoryId: findByCategoryId,
    findAllCategory: findAllCategory
}