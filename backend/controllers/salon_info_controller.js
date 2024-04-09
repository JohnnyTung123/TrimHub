const SalonInfo = require("../models/salon_info");
const path = require("path");

const createSalonInfo = async (req, res) => {
  const { userId, salonname } = req.body;

  try {
    // const duplicate = await SalonInfo.findOne({ user: userId });
    // if (duplicate) {
    //   return res.status(409).json({ error: "UserId already in use" });
    // }

    const salonInfo = await SalonInfo.create({ user: userId, salonname });
    console.log("Create Salon Info:", salonInfo);
    res.status(201).json({ success: "Salon Info created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getSalonInfo = async (req, res) => {
  const { salonId, userId } = req.query;

  try {
    if (salonId) {
      const salonInfo = await SalonInfo.findById(salonId).populate("user");
      console.log("Got Salon Info:", salonInfo);
      res.status(200).json(salonInfo);
    } else if (userId) {
      const salonInfo = await SalonInfo.findOne({ user: userId });
      console.log("Got Salon Info:", salonInfo);
      res.status(200).json(salonInfo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updateSalonInfo = async (req, res) => {
  const { salonId } = req.params;
  const { name, address } = req.body;
  console.log("Update Salon Info:", name, address);

  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      salonId,
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
  const { salonId } = req.query;

  try {
    const salonInfo = await SalonInfo.findById(salonId);
    if (!salonInfo.imageFilename) {
      console.log("No salon image found");
      return res.status(404).json({ error: "No salon image found" });
    }
    console.log("Going to send Salon Image:", salonInfo.imageFilename);
    res.status(200).sendFile(salonInfo.imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updateSalonImage = async (req, res) => {
  const { salonId } = req.params;
  console.log("Going to update Salon Image:", salonId);

  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      salonId,
      {
        imageFilename: req.file.filename,
        imagePath: path.resolve(req.file.path),
      },
      { new: true },
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Salon image updated successfully" });
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
      { new: true },
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Hairstyle added successfully" });
  } catch (error) {
    console.error("Error adding hairstyle:", error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const deleteHairstyle = async (req, res) => {
  const { salonId } = req.params;
  const { index } = req.body;
  console.log("Delete Hairstyle:", salonId, index);

  try {
    const salonInfo = await SalonInfo.findById(salonId);
    salonInfo.hairstyles.splice(index, 1);
    await salonInfo.save();
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Hairstyle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getHairstyles = async (req, res) => {
  const { salonId } = req.query;

  try {
    const salonInfo = await SalonInfo.findById(salonId);
    console.log("Got Salon Info:", salonInfo);
    res.status(200).json(salonInfo.hairstyles);
  } catch (error) {
    console.error("Error getting hairstyles:", error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

// get all salons
const getAllSalons = async (req, res) => {
  try {
    const salons = await SalonInfo.find();
    console.log("Got all salons:", salons);
    res.status(200).json(salons);
  } catch (error) {
    console.error("Error getting all salons:", error);
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
  deleteHairstyle,
  getHairstyles,
  getAllSalons,
};
