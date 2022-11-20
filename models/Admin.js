const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
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
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;