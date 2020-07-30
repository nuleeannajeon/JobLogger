const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDataSchema = new Schema(
  {
    userLogin_id: {
      type: Number,
      // { type: Schema.Types.ObjectId, ref: 'UserLogin' }?
    },
    school: {
      type: String,
    },
    location: {
      type: String
    },
    porfolioLink: {
      type: String
    },
    posts: {
      type: Schema.Types.ObjectId, ref: 'Posts' 
    }
  }
);

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;
