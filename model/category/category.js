var mongoose = require('mongoose');
var CategorySchema = require('./schema').Category;


CategorySchema.statics.findByCategoryId = function(categoryId) {
    return this.findOne({
        categoryId: categoryId
    });
}

CategorySchema.methods.addTodo = function(todo) {
   return this.model('categories').findByCategoryId(this.categoryId).then(category => {
        if(category){
            category.todos.push(todo);
            return category.save();
        }
        return null;
    });
}

var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;