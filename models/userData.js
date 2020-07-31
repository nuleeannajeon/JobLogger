const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    userLogin: { type: Schema.Types.ObjectId, ref: 'UserAuthentication' },
    school: {
        type: String,
    },
    location: {
        type: String,
    },
    portfolioLink: {
        type: String,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts',
    }],
});

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;
