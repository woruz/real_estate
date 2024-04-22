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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    owner_id: {
        type: String,
        required: true
    }
});

listingSchema.index({ location: 'text' });
listingSchema.index({ price: 1 });
listingSchema.index({ type: 1 });

module.exports = mongoose.model('Listing', listingSchema);