const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  // following contains an array of salon IDs
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalonInfo",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
