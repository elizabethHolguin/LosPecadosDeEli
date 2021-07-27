var mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
    commentaryID: {
        type: String,
        unique: true,
        required: true,
    },
    creation_date: {
        type: Date
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    date_birth: {
        type: Date
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('commentary', commentarySchema);