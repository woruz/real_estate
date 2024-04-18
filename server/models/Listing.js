// models/Listing.js

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
    // Add more fields as needed
});

listingSchema.index({ location: 'text' });
listingSchema.index({ price: 1 });
listingSchema.index({ type: 1 });

module.exports = mongoose.model('Listing', listingSchema);