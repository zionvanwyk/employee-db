const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// @route   POST /api/employees
// @desc    Create a new employee
router.post('/employees', createEmployee);

// @route   GET /api/employees
// @desc    Get all employees
router.get('/employees', getEmployees);

// @route   GET /api/employees/:id
// @desc    Get a single employee by ID
router.get('/employees/:id', getEmployeeById);

// @route   PUT /api/employees/:id
// @desc    Update an employee
router.put('/employees/:id', updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete an employee
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
