const mongoose = require("mongoose");

const SalonInfoSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
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
  hairstyles: [
    {
      imageFilename: {
        type: String,
      },
      imagePath: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  plans: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("SalonInfo", SalonInfoSchema);
