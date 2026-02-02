const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },

})

module.exports = mongoose.model('Product', productSchema);