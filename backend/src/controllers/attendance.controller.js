const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// ================= CHECK-IN =================
exports.checkIn = async (req, res) => {
  try {
    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    const hours = today.getHours();
    const minutes = today.getMinutes();

    let status = "present";

    if (hours > 12 || (hours === 12 && minutes > 0)) {
      status = "half-day";
    } else if (hours > 10 || (hours === 10 && minutes > 30)) {
      status = "late";
    }

    const employee = await Employee.findOne({
      user: req.user.id,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee record not found",
      });
    }

    const record = await Attendance.findOneAndUpdate(
      {
        user: req.user.id,
        date,
      },
      {
        user: req.user.id,
        employee: employee._id,
        date,
        checkIn: today.toTimeString().slice(0, 5),
        status,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    res.json(record);

  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= CHECK-OUT =================
exports.checkOut = async (req, res) => {
  try {
    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    const record = await Attendance.findOneAndUpdate(
      {
        user: req.user.id,
        date,
      },
      {
        checkOut: today.toTimeString().slice(0, 5),
      },
      {
        new: true,
      }
    );

    if (!record) {
      return res.status(404).json({
        message: "Check-in not found for today",
      });
    }

    res.json(record);

  } catch (err) {
    console.error("CHECK-OUT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET MY ATTENDANCE =================
exports.getMyAttendance = async (req, res) => {
  try {

    console.log("REQ USER:", req.user);

    const records = await Attendance.find({
      user: req.user.id,
    }).sort({ date: -1 });

    console.log("ATTENDANCE RECORDS:", records);

    res.json(records);

  } catch (err) {
    console.error("GET MY ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN ATTENDANCE =================
exports.getAdminAttendance = async (req, res) => {
  try {
    const query = {};

    if (req.query.date) {
      query.date = req.query.date;
    }

    const records = await Attendance.find(query)
      .populate("user", "email role")
      .sort({ date: -1 });

    console.log("ADMIN ATTENDANCE:", records);

    res.json(records);

  } catch (err) {
    console.error("ADMIN ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};