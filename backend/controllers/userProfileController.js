const User = require("../models/User");
const Employee = require("../models/Employee");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("email avatarUrl role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employee = await Employee.findOne({ email: user.email }).select(
      "name surname employeeNumber role"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const userProfile = {
      fullName: `${employee.name} ${employee.surname}`,
      employeeID: employee.employeeNumber,
      email: user.email,
      roleDisplay: employee.role,
      role: user.role,
      avatarUrl: user.avatarUrl,
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
