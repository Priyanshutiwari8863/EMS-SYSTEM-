const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Holiday = require("../models/Holiday");

const { getAllDatesOfMonth, isWeekend } = require("../utils/dateUtils");
const { calculatePayroll } = require("../utils/payrollCalculator");
const { sendMail } = require("../utils/email");

// =======================
// GENERATE PAYROLL
// =======================
const generatePayroll = async (req, res) => {
  try {
    const { month } = req.body;

    // 🔒 Month lock
    const existing = await Payroll.findOne({
      month,
      generatedBy: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "Payroll already generated for this month",
      });
    }

    const employees = await Employee.find({
      user: req.user.id,
    });

    const allDates = getAllDatesOfMonth(month);

    const holidays = await Holiday.find({
      user: req.user.id,
    });

    const holidaySet = new Set(holidays.map((h) => h.date));

    const payrolls = [];

    for (let emp of employees) {
      // 🗓 Working days
      const workingDates = allDates.filter((date) => {
        const d = date.toISOString().slice(0, 10);
        return !isWeekend(date) && !holidaySet.has(d);
      });

      const workingDays = workingDates.length;

      // 📊 Attendance
      const attendance = await Attendance.find({
        employee: emp._id,
        user: req.user.id,
        date: { $regex: `^${month}` },
      });

      const presentDays =
        attendance.filter((a) => a.status === "present").length;

      // 🧮 Salary calculation
      const result = calculatePayroll({
        monthlySalary: emp.salary,
        workingDays,
        presentDays,
        halfDays: attendance.filter((a) => a.status === "half-day").length,
      });

      payrolls.push({
        employee: emp._id,
        month,
        baseSalary: emp.salary,

        workingDays,
        presentDays,
        absentDays: result.absentDays,

        paidLeaves: result.paidLeaves,
        extraLeaves: result.extraLeaves,

        perDaySalary: result.perDaySalary,
        deduction: result.deduction,
        finalSalary: result.finalSalary,

        generatedBy: req.user.id,
      });

      // 📧 SEND EMAIL
      if (emp.email) {
        await sendMail(
          emp.email,
          "Salary Slip Generated",
          `<h3>Your salary has been credited</h3>
           <p>Month: ${month}</p>
           <p>Net Salary: ₹ ${result.finalSalary}</p>`
        );
      }
    }

    await Payroll.insertMany(payrolls);

    res.json({
      message: "Payroll generated successfully",
      payrolls,
    });
  } catch (error) {
    console.error("PAYROLL ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET PAYROLL HISTORY  ⭐ FIXED HERE
// =======================
const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find({
      generatedBy: req.user.id,
    })
      .populate("employee", "name department position")
      .sort({ createdAt: -1 });

    // ✅ IMPORTANT FIX → frontend expects "records"
    res.json({ records: payrolls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// EXPORT
// =======================
module.exports = {
  generatePayroll,
  getPayrolls,
};
