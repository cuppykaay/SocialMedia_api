const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: { type: String },
    username: { type: String },
    phonenumber: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
