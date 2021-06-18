const mongoose = require('mongoose');

const OrphSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    officialDoc: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Orphanage', OrphSchema);
