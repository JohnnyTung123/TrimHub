const SalonInfo = require("../models/salon_info");
const path = require("path");

const createSalonInfo = async (req, res) => {
  const { username, salonname } = req.body;

  try {
    // const duplicate = await SalonInfo.findOne({ username });
    // if (duplicate) {
    //   return res.status(409).json({ error: "Salon name already in use" });
    // }

    const salonInfo = await SalonInfo.create({ username, salonname });
    console.log("Create Salon Info:", salonInfo);
    res.status(201).json({ success: "Salon Info created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getSalonInfo = async (req, res) => {
  const { username } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({ username });
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
      { new: true }
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Salon info updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getSalonImage = async (req, res) => {
  const { username } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({ username });
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
      { new: true }
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Salon image updateed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const createHairstyle = async (req, res) => {
  const { salonId } = req.params;
  const { description } = req.body;

  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      salonId,
      {
        $push: {
          hairstyles: {
            imageFilename: req.file.filename,
            imagePath: path.resolve(req.file.path),
            description,
          },
        },
      },
      { new: true }
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Hairstyle added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getHairstyles = async (req, res) => {
  const { username } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({
      username,
    });
    const hairstyles = salonInfo.hairstyles.map((style) => ({
      imagePath: style.imagePath,
      description: style.description,
    }));

    console.log("Got Hairstyles:", hairstyles);
    res.status(200).json(hairstyles);
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
  createHairstyle,
  getHairstyles,
};
