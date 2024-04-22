const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    listing_id: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Contact', contactSchema);