require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Custom routes
app.use("/auth", require("./routes/auth_route"));

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_KEY);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error(`Cannot connect to MongoDB: ${err}`);
});
