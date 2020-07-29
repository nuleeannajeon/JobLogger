const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLoginSchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      validate: [({ length }) => length >= 8, "Password should be 8 characters or longer."]
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    sessionId: {
      type: Number
      //random number or exisitng _id
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const UserLogin = mongoose.model("UserLogin", UserLoginSchema);
module.exports = UserLogin;