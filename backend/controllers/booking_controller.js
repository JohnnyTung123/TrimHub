const Booking = require("../models/booking");

const createBooking = async (req, res) => {
  const { userId, planId, date } = req.body;

  if (!userId || !planId || !date) {
    console.log("Receive empty data");
    return res.status(400).json({ error: "Receive empty data" });
  }

  try {
    const booking = await Booking.create({
      user: userId,
      plan: planId,
      date: date,
    });

    await booking.populate("user");
    await booking.populate({
      path: "plan",
      populate: {
        path: "salon",
        populate: {
          path: "user",
        },
      },
    });

    console.log("Created Booking:", booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getBookings = async (req, res) => {
  const { userId } = req.query;

  try {
    const bookings = await Booking.find({ user: userId })
      .populate("user")
      .populate({
        path: "plan",
        populate: {
          path: "salon",
          populate: {
            path: "user",
          },
        },
      });
    console.log("Got Bookings:", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = { createBooking, getBookings };
