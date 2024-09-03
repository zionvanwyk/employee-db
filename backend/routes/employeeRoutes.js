const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// Route to create a new employee (only accessible to admins)
router.post(
  "/employees",
  authenticateToken,
  roleMiddleware("manager"),
  createEmployee
);

// Route to get all employees (accessible to any authenticated user)
router.get("/employees", authenticateToken, getEmployees);

// Route to get a single employee by employee number (accessible to any authenticated user)
router.get(
  "/employees/number/:employeeNumber",
  authenticateToken,
  getEmployeeById
);

// Route to update an employee by employee number (only accessible to managers)
router.put(
  "/employees/number/:employeeNumber",
  authenticateToken,
  roleMiddleware("manager"),
  updateEmployee
);

// Route to delete an employee by employee number (only accessible to managers)
router.delete(
  "/employees/number/:employeeNumber",
  authenticateToken,
  roleMiddleware("manager"),
  deleteEmployee
);

module.exports = router;
