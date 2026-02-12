const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");

exports.getSalaryAnalytics = async (req, res) => {
  try {
    const { month } = req.query;

    const filter = {
      generatedBy: req.user.id,
    };

    if (month) {
      filter.month = month;
    }

    const payrolls = await Payroll.find(filter)
      .populate("employee", "department");

    /* ================= KPI ================= */
    const totalEmployees = payrolls.length;

    const totalPayout = payrolls.reduce(
      (sum, p) => sum + p.finalSalary,
      0
    );

    const averageSalary =
      totalEmployees === 0
        ? 0
        : Math.round(totalPayout / totalEmployees);

    /* ================= SALARY TREND ================= */
    const trendMap = {};

    payrolls.forEach((p) => {
      if (!trendMap[p.month]) {
        trendMap[p.month] = { month: p.month, payout: 0 };
      }
      trendMap[p.month].payout += p.finalSalary;
    });

    const salaryTrend = Object.values(trendMap).sort(
      (a, b) => a.month.localeCompare(b.month)
    );

    /* ================= DEPARTMENT DISTRIBUTION ================= */
    const deptMap = {};

    payrolls.forEach((p) => {
      const dept = p.employee?.department || "Unknown";

      if (!deptMap[dept]) deptMap[dept] = 0;

      deptMap[dept]++;
    });

    const departmentData = Object.entries(deptMap).map(
      ([name, value]) => ({ name, value })
    );

    /* ================= RESPONSE ================= */
    res.json({
      totalEmployees,
      totalPayout,
      averageSalary,
      salaryTrend,
      departmentData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
