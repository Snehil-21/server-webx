const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productTitle: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    inStock: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productPic: {
        type: String,
        required: true,
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;