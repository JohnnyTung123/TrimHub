const express = require("express");
const bookingController = require("../controllers/booking_controller");

const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);

module.exports = router;
