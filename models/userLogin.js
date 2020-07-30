const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userAuthenticationSchema = new Schema(
    {
        email: { type: String, required: true, trim: true },
        password: { type: String },
        session: { type: String, default: '' },
        authId: String,
        thumbnail: String,
        name: String,
        username: String

    },
    {
        timestamps: true,
    }
);

const UserAuthentication = mongoose.model('UserAuthentication', userAuthenticationSchema);

module.exports = UserAuthentication;
