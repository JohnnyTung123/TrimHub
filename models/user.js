const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Missing email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Missing username"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Missing password"],
  },
  usertype: {
    type: String,
    required: [true, "Missing usertype"],
  },
});

module.exports = mongoose.model("User", UserSchema);
