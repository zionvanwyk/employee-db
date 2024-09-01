const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// @route   POST /api/employees
// @desc    Create a new employee
// Works!
router.post("/employees", createEmployee);

// @route   GET /api/employees
// @desc    Get all employees
// Works!
router.get("/employees", getEmployees);

// @route   GET /api/employees/:id
// @desc    Get a single employee by ID
// Works!
router.get("/employees/number/:employeeNumber", getEmployeeById);

// @route   PUT /api/employees/:id
// @desc    Update an employee by ID
// Doesn't work
router.put("/employees/:id", updateEmployee);

// @route   PUT /api/employees/:id
// @desc    Update an employee
// Works!
router.put("/employees/number/:employeeNumber", updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete an employee
// Works!
router.delete("/employees/number/:employeeNumber", deleteEmployee);

module.exports = router;
