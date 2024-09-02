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
      "name surname role"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const userProfile = {
      name: employee.name,
      surname: employee.surname,
      role: employee.role,
      avatarUrl: user.avatarUrl, // This should already be the Gravatar URL
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
