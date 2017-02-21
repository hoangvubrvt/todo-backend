var mongoose = require('mongoose');
var bluebirdPromise = require('bluebird');
var mockgoose = require('mockgoose');
var root = require('app-root-path');

module.exports.startServer = () => {
    return mockgoose(mongoose).then(() => {
        require(`${root.path}/app`);  
    })
}

module.exports.resetDB = (model) => {
    return model.remove({});
}