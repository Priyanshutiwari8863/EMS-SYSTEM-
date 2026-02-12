const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// EMPLOYEE APPLY LEAVE
exports.applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    const employee = await Employee.findOne({
      user: req.user.id
    });

    const leave = await Leave.create({
      employee: employee._id,
      user: req.user.id,
      fromDate,
      toDate,
      reason
    });

    res.json({ message: "Leave applied", leave });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN VIEW ALL LEAVES
exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find()
    .populate("employee", "name department")
    .sort({ createdAt: -1 });

  res.json({ leaves });
};

// ADMIN APPROVE / REJECT
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(leave);
};
