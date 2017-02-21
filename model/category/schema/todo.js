var Schema = require('mongoose').Schema;
var todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }
}, {
    timestamps: {
        created_at: 'createdDate'
    }
});

module.exports = todoSchema