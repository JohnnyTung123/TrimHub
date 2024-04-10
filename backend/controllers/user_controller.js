const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
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
    console.log("Created User:", user);
    res.status(201).json({ success: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Got Users:", users);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const updateUser = async (req, res) => {
  const { userId, email, username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        email: email,
        username: username,
        password: hashPassword,
      },
      { new: true }
    );
    console.log("Updated User:", user);
    res.status(200).json({ success: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: `Cannot find User Id ${userId}` });
    }
    console.log("Deleted User:", user);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const followSalon = async (req, res) => {
  const { userId, salonId, follow } = req.body;
  // follow = true to follow, follow = false to unfollow
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: `Cannot find User Id ${userId}` });
    }
    if (follow) {
      user.following.push(salonId);
      console.log("followed salon");
    } else {
      user.following.pull(salonId);
      console.log("unfollowed salon");
    }
    await user.save();
    res.status(200).json({ success: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

const getFollowedSalons = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: `Cannot find User Id ${userId}` });
    }
    console.log("Got followed salons:", user.following);
    res.status(200).json(user.following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server side error: ${err.message}` });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  followSalon,
  getFollowedSalons,
};
