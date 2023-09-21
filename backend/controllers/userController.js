const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");

// login user
const loginUser = asyncHandler(async (req, res) => {
  res.json({ mssg: "login user" });
});

// signup user
const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    res.status(200).json({ username, email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { loginUser, signupUser };
