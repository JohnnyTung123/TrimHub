const express = require("express");
const hairstyleController = require("../controllers/hairstyle_controller");
const { upload } = require("../helpers/file_upload");

const router = express.Router();

router.post(
  "/",
  upload.single("hairstyle-image"),
  hairstyleController.createHairstyle,
);
router.get("/:hairstyleId", hairstyleController.getHairstyle);
router.get("/", hairstyleController.getHairstyles);
router.delete("/:hairstyleId", hairstyleController.deleteHairstyle);

module.exports = router;
