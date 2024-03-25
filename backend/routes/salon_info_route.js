const express = require("express");
const salonInfoController = require("../controllers/salon_info_controller");
const { upload } = require("../helpers/file_upload");

const router = express.Router();

router.post("/", salonInfoController.createSalonInfo);
router.get("/", salonInfoController.getSalonInfo);
router.put("/:salonId", salonInfoController.updateSalonInfo);
router.get("/image", salonInfoController.getSalonImage);
router.put(
  "/image/:salonId",
  upload.single("salon-image"),
  salonInfoController.updateSalonImage
);

module.exports = router;
