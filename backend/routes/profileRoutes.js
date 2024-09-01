const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userProfileController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/profile", authenticateToken, getUserProfile);

module.exports = router;
