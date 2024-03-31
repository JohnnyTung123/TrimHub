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
  salonInfoController.updateSalonImage
);

// Salon Hairstyles
router.put(
  "/hairstyles/:salonId",
  upload.single("hairstyle-image"),
  salonInfoController.createHairstyle
);
router.get("/hairstyles", salonInfoController.getHairstyles);
router.delete("/hairstyles/:salonId", salonInfoController.deleteHairstyle);

// Salon Plans
router.post("/plans/:salonId", salonInfoController.createPlan);
router.delete("/plans/:salonId", salonInfoController.deletePlan);
router.put("/plans/:salonId", salonInfoController.updatePlan);

module.exports = router;
