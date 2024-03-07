const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, username, password, usertype } = req.body;

  try {
    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const duplicateUsername = await User.findOne({ username: username });
    if (duplicateUsername) {
      return res.status(409).json({ error: "Username already in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

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

module.exports = { signup };
