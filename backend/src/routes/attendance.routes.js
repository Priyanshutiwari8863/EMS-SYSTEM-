const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/attendance.controller");

// CHECK-IN
router.post("/checkin", auth(), controller.checkIn);

// CHECK-OUT
router.post("/checkout", auth(), controller.checkOut);

// GET MY ATTENDANCE
// Frontend should call: /api/attendance
router.get("/", auth(), controller.getMyAttendance);

// OPTIONAL SUPPORT
// If frontend calls: /api/attendance/my
router.get("/my", auth(), controller.getMyAttendance);

// ADMIN ATTENDANCE
router.get("/admin", auth("admin"), controller.getAdminAttendance);

module.exports = router;