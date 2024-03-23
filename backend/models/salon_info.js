const mongoose = require("mongoose");

const SalonInfoSchema = mongoose.Schema({
  name: {
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
});

module.exports = mongoose.model("SalonInfo", SalonInfoSchema);
