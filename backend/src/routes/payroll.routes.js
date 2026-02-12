const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const payrollController = require("../controllers/payroll.controller");

// generate payroll
router.post("/generate", auth(), payrollController.generatePayroll);

// get payroll history
router.get("/", auth(), payrollController.getPayrolls);

module.exports = router;
