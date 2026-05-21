const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const controller = require("../controllers/attendance.controller");

// CHECK-IN
router.post("/checkin", auth(), controller.checkIn);

// CHECK-OUT
router.post("/checkout", auth(), controller.checkOut);

// GET MY ATTENDANCE
router.get("/", auth(), controller.getMyAttendance);

router.get("/my", auth(), controller.getMyAttendance);

// ADMIN ATTENDANCE
router.get(
  "/admin",
  auth("admin"),
  controller.getAdminAttendance
);

module.exports = router;