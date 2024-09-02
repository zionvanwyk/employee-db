const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
const jwtSecret = process.env.JWT_SECRET;

connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", employeeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Employee DB Backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
