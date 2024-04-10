const express = require("express");
const salonInfoController = require("../controllers/salon_info_controller");
const { upload } = require("../helpers/file_upload");

const router = express.Router();

// Salon Info
router.post("/", salonInfoController.createSalonInfo);
router.get("/", salonInfoController.getSalonInfo);
router.put("/:salonId", salonInfoController.updateSalonInfo);

// Salon Image
router.get("/image", salonInfoController.getSalonImage);
router.put(
  "/image/:salonId",
  upload.single("salon-image"),
  salonInfoController.updateSalonImage,
);

// Salon Reaction
router.put("/reaction/:salonId", salonInfoController.reactSalon);

// Get all salons
router.get("/all", salonInfoController.getAllSalons);

module.exports = router;
