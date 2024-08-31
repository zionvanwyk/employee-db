const Employee = require("../models/Employee");

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, surname, birthDate, employeeNumber, salary, role, manager } =
      req.body;

    const newEmployee = new Employee({
      name,
      surname,
      birthDate,
      employeeNumber,
      salary,
      role,
      manager,
    });

    const employee = await newEmployee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single employee by ID
exports.getEmployeeByNumber = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeNumber: req.params.employeeNumber,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
