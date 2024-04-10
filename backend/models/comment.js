const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalonInfo",
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // reaction: [
  //   {
  //     username: {
  //       type: String,
  //       required: true,
  //       lowercase: true,
  //       trim: true,
  //     },
  //     response: {
  //       type: String,
  //       enum: ["like", "dislike"],
  //     },
  //   },
  // ],
});

module.exports = mongoose.model("Comment", CommentSchema);
