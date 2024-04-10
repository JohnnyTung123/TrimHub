const mongoose = require("mongoose");

const SalonInfoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  salonname: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
  },
  imageFilename: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  reaction: [
    {
      username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      response: {
        type: String,
        enum: ["like", "dislike"],
      },
    },
  ],
});

module.exports = mongoose.model("SalonInfo", SalonInfoSchema);
