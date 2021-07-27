var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true,
        required: true,
    },
    categoryID: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    unitPrice: {
        type: Number
    },
    url_image: {
        type: String
    },
});

module.exports = mongoose.model('product', productSchema);