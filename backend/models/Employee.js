const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthDate: { type: Date, required: true },
  employeeNumber: { type: String, required: true, unique: true },
  salary: { type: Number, required: true },
  role: { type: String, required: true },
  manager: { type: String, default: null }, // Stores employeeNumber of manager
  avatarUrl: { type: String, default: "" }, // For Gravatar integration
});

module.exports = mongoose.model("Employee", EmployeeSchema, "Employees");
