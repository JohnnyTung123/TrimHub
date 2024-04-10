const mongoose = require("mongoose");

const HairstyleSchema = mongoose.Schema(
  {
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalonInfo",
      required: true,
    },
    imageFilename: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Hairstyle", HairstyleSchema);
