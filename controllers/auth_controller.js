const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, username, password, usertype } = req.body;

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

    // Set session
    req.session.login = true;
    req.session.username = user.username;
    req.session.usertype = user.usertype;

    console.log("User login successfully", req.session);
    res.status(200).json({ user: user.username, usertype: user.usertype });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const logout = async (req, res) => {
  req.session.destory();
  console.log("User logout successfully", req.session);
  res.status(200).json({ success: "User logout successfully" });
};

module.exports = { signup, login, logout };
