const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Example of a protected route for admins only
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

// Example of a protected route for general users
router.get("/user", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

module.exports = router;
