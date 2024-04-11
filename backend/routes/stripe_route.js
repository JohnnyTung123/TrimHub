const express = require("express");
const stripeController = require("../controllers/stripe_controller");

const router = express.Router();

router.post("/create-checkout-session", stripeController.createCheckoutSession);

module.exports = router;
