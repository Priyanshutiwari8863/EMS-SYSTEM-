const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    month: {
      type: String, // "2026-01"
      required: true
    },

    baseSalary: Number,
    workingDays: Number,
    presentDays: Number,
    absentDays: Number,
    perDaySalary: Number,
    finalSalary: Number,
    deduction: Number, // ✅ IMPORTANT

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true // ✅ VERY IMPORTANT
  }
);

module.exports = mongoose.model("Payroll", payrollSchema);
