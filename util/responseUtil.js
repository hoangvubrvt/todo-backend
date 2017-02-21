var http = require('http');
var _ = require('lodash');
var root = require('app-root-path');

const STATUS = {
    SUCCESS: 'success',
    FAIL: 'fail',
    ERROR: 'error'
}

function sendResponse(res, status, message, error) {
    if (!(res instanceof http.ServerResponse)) {
        throw Error('Invalid resquest object');
    };
    res.status(200);
    var responseBody = {
        type: status
    };

    if (_.isEqual(status, STATUS.ERROR)) {
        responseBody.message = message;
        if (error) {
            responseBody.data = error.stack;
        }
    } else {
        responseBody.data = message;
    }

    res.json(responseBody);
}

function sendErrorResponse(res, message, error) {
    sendResponse(res, STATUS.ERROR, message, error);
}

function sendFailResponse(res, message) {
    sendResponse(res, STATUS.FAIL, message);
}

function sendSuccessResponse(res, data) {
    sendResponse(res, STATUS.SUCCESS, data);
}

module.exports = {
    sendErrorResponse: sendErrorResponse,
    sendFailResponse: sendFailResponse,
    sendSuccessResponse: sendSuccessResponse,
}