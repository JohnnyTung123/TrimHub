const express = require("express");
const authController = require("../controllers/auth_controller");

const router = express.Router();

router.post("/otp", authController.otp);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
