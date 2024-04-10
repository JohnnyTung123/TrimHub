const Hairstyle = require("../models/hairstyle");
const path = require("path");

const createHairstyle = async (req, res) => {
  const { salonId, description } = req.body;

  if (!salonId || !description) {
    console.log("Receive empty data");
    return res.status(400).json({ error: "Receive empty data" });
  }

  try {
    const hairstyle = await Hairstyle.create({
      salon: salonId,
      imageFilename: req.file.filename,
      imagePath: path.resolve(req.file.path),
      description: description,
    });
    await hairstyle.populate("salon");

    console.log("Created Hairstyle:", hairstyle);
    res.status(201).json(hairstyle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getHairstyle = async (req, res) => {
  const { hairstyleId } = req.params;

  try {
    const hairstyle = await Hairstyle.findById(hairstyleId).populate("salon");
    console.log("Got Hairstyle:", hairstyle);
    res.status(200).sendFile(hairstyle.imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getHairstyles = async (req, res) => {
  const { salonId } = req.query;
  const query = salonId ? { salon: salonId } : null;

  try {
    const hairstyles = await Hairstyle.find(query).populate("salon");
    console.log("Got Hairstyles:", hairstyles);
    res.status(200).json(hairstyles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const deleteHairstyle = async (req, res) => {
  const { hairstyleId } = req.params;

  try {
    const hairstyle = await Hairstyle.findByIdAndDelete(hairstyleId);
    if (!hairstyle) {
      return res.status(404).json({ error: `Cannot find Hairstyle Id ${hairstyleId}` });
    }
    console.log("Deleted Hairstyle:", hairstyle);
    res.status(204).json(hairstyle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = { createHairstyle, getHairstyle, getHairstyles, deleteHairstyle };
