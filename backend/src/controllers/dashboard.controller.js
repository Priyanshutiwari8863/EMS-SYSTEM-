const Employee = require("../models/Employee");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({
      user: req.user.id,
    });

    const activeEmployees = await Employee.countDocuments({
      user: req.user.id,
      status: "active",
    });

    res.json({
      totalEmployees,
      activeEmployees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
