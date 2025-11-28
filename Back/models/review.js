const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    rate: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);