require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

function getGravatarUrl(email, size = 80) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

router.put("/sync-gravatar", async (req, res) => {
  try {
    const { email } = req.body;

    const avatarUrl = getGravatarUrl(email, 100);
    console.log("Generated Gravatar URL:", avatarUrl); // Log the generated URL

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { avatarUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser); // Log the updated user object
    res.json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error("Error syncing with Gravatar:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "username email avatarUrl role"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a JWT token before saving the user
    const tempUser = { username, email, role: role || "user" };
    const token = jwt.sign({ ...tempUser }, JWT_SECRET, { expiresIn: "1h" });

    // Now save the user to the database
    user = new User({
      ...tempUser,
      password: hashedPassword,
      avatarUrl: getGravatarUrl(email),
    });

    const savedUser = await user.save();

    // Return the JWT token
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
module.exports = authenticateToken;
