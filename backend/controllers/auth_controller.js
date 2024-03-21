const User = require("../models/user");
const OTP = require("../models/otp");
const sendEmail = require("../helpers/email_sender");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

const otp = async (req, res) => {
  const { email, username } = req.body;

  try {
    // Check if user already in use
    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const duplicateUsername = await User.findOne({ username: username });
    if (duplicateUsername) {
      return res.status(409).json({ error: "Username already in use" });
    }

    // Generate OTP
    await OTP.deleteOne({ email: email });
    const otp = await OTP.create({
      email: email,
      otp: otpGenerator.generate(6, { specialChars: false }),
    });
    console.log("Created OTP:", otp);

    // Send OTP Email
    const title = "Verify Your Email Address";
    const body = `
      <h1>Please confirm your OTP</h1>
      <p>Here is your OTP code: ${otp.otp}</p>
    `;
    const otpEmailResponse = await sendEmail(email, title, body);
    console.log("Sent OTP:", otpEmailResponse);

    res.status(200).json({ success: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const signup = async (req, res) => {
  const { email, username, password, usertype, otp } = req.body;

  try {
    // Check if user already in use
    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const duplicateUsername = await User.findOne({ username: username });
    if (duplicateUsername) {
      return res.status(409).json({ error: "Username already in use" });
    }

    // Validate OTP
    const otpSent = await OTP.findOne({ email: email });
    if (!otpSent || otp !== otpSent.otp) {
      return res.status(400).json({ error: "Wrong OTP" });
    }

    // Salt Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email: email,
      username: username,
      password: hashPassword,
      usertype: usertype,
    });
    console.log("Create User:", user);
    res.status(201).json({ success: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Authenticate user
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Wrong username" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Create token
    const accessToken = jwt.sign(
      { user: user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    console.log("User login successfully");
    res.status(200).json({
      accessToken: accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  console.log("User logout successfully", req.session);
  res.status(200).json({ success: "User logout successfully" });
};

module.exports = { otp, signup, login, logout };
