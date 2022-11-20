const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    hashPassword: {
        type: String
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Product',
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;