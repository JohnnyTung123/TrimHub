const express = require("express");
const authController = require("../controllers/auth_controller");
const { authenticateToken } = require("../middleware/verify_auth");

const router = express.Router();

router.post("/otp", authController.otp);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/endpoint", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
