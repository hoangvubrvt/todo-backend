var Schema = require('mongoose').Schema;
var todoSchema = require('./todo');

var todoCategorySchema = new Schema({
    categoryId: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },

    categoryTitle: {
        type: String,
        trim: true
    },
    
    todos: [todoSchema]
});


module.exports = todoCategorySchema;