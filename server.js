const express = require("express");
const cors = require("cors");
const { connectDb, getDb } = require("./database");
const app = express();
const PORT = process.env.PORT || 3000;

const bcrypt = require("bcrypt");

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  let { email, username, ...userData } = req.body;
  try {
    // Connect to the database
    await connectDb();
    const db = getDb();

    // Check if the email is already in use
    const emailExists = await db.collection("users").findOne({ email });
    if (emailExists) {
      return res.status(400).send({ error: "Email already in use" });
    }

    // Check if the username is already in use
    const usernameExists = await db.collection("users").findOne({ username });
    if (usernameExists) {
      return res.status(400).send({ error: "Username already in use" });
    }

    // Hash password
    userData.password = await bcrypt.hash(userData.password, 10);

    // Insert the user into the database
    const user = await db.collection("users").insertOne({
      email,
      username,
      ...userData,
    });
    res.status(200).json({ success: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occured while trying to create a user." });
  }
});
