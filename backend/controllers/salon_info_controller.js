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
  console.log("Update Salon Info:", name, address);

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
    // If no image found, send a message
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
  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      req.params.salonId,
      {
        hairstyles: {
          imageFilename: req.file.filename,
          imagePath: path.resolve(req.file.path),
          description: req.body.description,
        },
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
  const { username } = req.query;

  try {
    const salonInfo = await SalonInfo.findOne({ username });
    console.log("Got Salon Info:", salonInfo);
    res.status(200).json(salonInfo.hairstyles);
  } catch (error) {
    console.error("Error getting hairstyles:", error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const createPlan = async (req, res) => {
  const { salonId } = req.params;
  const { name, price, description } = req.body;

  try {
    const salonInfo = await SalonInfo.findByIdAndUpdate(
      salonId,
      {
        $push: {
          plans: {
            name,
            price,
            description,
          },
        },
      },
      { new: true }
    );
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Plan added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const deletePlan = async (req, res) => {
  const { salonId } = req.params;
  const { index } = req.body;

  console.log("Delete Plan:", salonId, index);

  try {
    const salonInfo = await SalonInfo.findById(salonId);
    salonInfo.plans.splice(index, 1);
    await salonInfo.save();
    console.log("Updated Salon Info:", salonInfo);
    res.status(200).json({ success: "Plan deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updatePlan = async (req, res) => {
  const { salonId } = req.params;
  const { index, name, price, description } = req.body;

  try {
    const updatedSalonInfo = await SalonInfo.findByIdAndUpdate(
      salonId,
      {
        $set: {
          [`plans.${index}.name`]: name,
          [`plans.${index}.price`]: price,
          [`plans.${index}.description`]: description,
        },
      },
      { new: true }
    );

    if (!updatedSalonInfo) {
      return res.status(404).json({ error: "Salon not found" });
    }

    console.log("Updated Salon Info:", updatedSalonInfo);
    res.status(200).json({ success: "Plan updated successfully" });
  } catch (error) {
    console.error(error);
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
  createPlan,
  deletePlan,
  updatePlan,
  getAllSalons,
};
