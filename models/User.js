const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: "",
        },
    },
)

UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await candidatePassword === userPassword;
};

module.exports = mongoose.model('User', UserSchema)