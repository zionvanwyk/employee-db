require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const JWT_SECRET = process.env.JWT_SECRET;

router.put("/sync-gravatar", authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;

    const avatarUrl = getGravatarUrl(email, 100);
    console.log("Generated Gravatar URL:", avatarUrl);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { avatarUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser);
    res.json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error("Error syncing with Gravatar:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const tempUser = { username, email, role: role || "user" };
    const token = jwt.sign({ ...tempUser }, JWT_SECRET, { expiresIn: "1h" });

    user = new User({
      ...tempUser,
      password: hashedPassword,
      avatarUrl: getGravatarUrl(email),
    });

    const savedUser = await user.save();
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

function getGravatarUrl(email, size = 80) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

module.exports = router;
