const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const profileRoutes = require("./routes/profileRoutes");

require("dotenv").config();

const app = express();
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from your Vue.js frontend

// Routes
app.use("/api", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/profile", profileRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Employee DB Backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
