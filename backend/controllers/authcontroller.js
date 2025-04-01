const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Poll = require("../models/Poll");
// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, username, email, password, profileImageUrl } = req.body;

  // Validation: Check for missing fields
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validation: Check username format - use alpha  numeric characters and hyphens only
  // Example: "john-doe", "jane123", "user-name-123"
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username. Only alphanumeric characters and hyphens are allowed. No spaces are permitted.",
    });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(480).json({ message: "Email already in use" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username not available. Try another one." });
    }

    // Create the user
    const user = await User.create({
      fullName,
      username,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      id: user._id,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in registering user", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation: Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password does not match" });
    }

    // Count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({ creator: user._id });

    // Count polls the user has voted in
    const totalPollsVoted = await Poll.countDocuments({ voters: user._id });

    // Get the count of bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    res.status(200).json({
      message: "User logged in successfully",
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated,
        totalPollsVoted,
        totalPollsBookmarked,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in logging in user", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({ creator: user._id });

    // Count polls the user has voted in
    const totalPollsVoted = await Poll.countDocuments({ voters: user._id });

    // Get the count of bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    const userInfo = {
      ...user.toObject(),
      totalPollsCreated,
      totalPollsVoted,
      totalPollsBookmarked,
    };

    res.status(200).json(userInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in fetching user details", error: err.message });
  }
};
