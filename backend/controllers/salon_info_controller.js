const SalonInfo = require("../models/salon_info");
const path = require("path");

const createSalonInfo = async (req, res) => {
  const { name } = req.body;

  try {
    const duplicate = await SalonInfo.findOne({ name });
    if (duplicate) {
      return res.status(409).json({ error: "Salon name already in use" });
    }

    const salonInfo = await SalonInfo.create({ name });
    console.log("Create Salon Info:", salonInfo);
    res.status(201).json({ success: "Salon Info created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getSalonInfo = async (req, res) => {
  const { name } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({ name });
    console.log("Got Salon Info:", salonInfo);
    res.status(200).json(salonInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updateSalonInfo = async (req, res) => {
  const { name, address } = req.body;

  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      req.params.salonId,
      {
        name,
        address,
      },
      { new: true },
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Salon info updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getSalonImage = async (req, res) => {
  const { name } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({ name });
    console.log("Going to send Salon Image:", salonInfo.imageFilename);
    res.status(200).sendFile(salonInfo.imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updateSalonImage = async (req, res) => {
  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      req.params.salonId,
      {
        imageFilename: req.file.filename,
        imagePath: path.resolve(req.file.path),
      },
      { new: true },
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Salon image updateed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = {
  createSalonInfo,
  getSalonInfo,
  updateSalonInfo,
  getSalonImage,
  updateSalonImage,
};