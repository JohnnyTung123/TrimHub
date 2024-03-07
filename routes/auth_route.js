const express = require("express");
const authController = require("../controllers/auth_controller");

const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
