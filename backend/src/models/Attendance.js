const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String, // YYYY-MM-DD
    required: true
  },

  status: {
    type: String,
    enum: ["present", "late", "half-day", "absent"],
    default: "present"
  },

  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
