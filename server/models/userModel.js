const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    phone: {
        type: Number,
        required: [true, "phone is required"],
    },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);