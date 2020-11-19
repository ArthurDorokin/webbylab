const mongoose = require('mongoose');
const schema = mongoose.Schema;
const movies = new schema({
    Title: {
        type: String,
        required: true
    },
    ReleaseYear: {
        type: Number
    },
    Format: {
        type: String
    },
    Stars: {
        type: Array
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('movies', movies);