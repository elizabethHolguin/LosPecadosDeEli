var mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryID: {
        type: String,
        unique: true,
        required: true,
    },
    categoryname: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('category', categorySchema);