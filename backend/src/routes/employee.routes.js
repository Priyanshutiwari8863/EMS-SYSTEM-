const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const employeeController = require("../controllers/employee.controller");

// 🔥 TEST LOG (temporary)
console.log("EMP CONTROLLER:", employeeController);

router.get("/", auth(), employeeController.getEmployees);

router.post("/", auth("admin"), employeeController.createEmployee);

router.put("/:id", auth("admin"), employeeController.updateEmployee);

router.delete("/:id", auth("admin"), employeeController.deleteEmployee);

module.exports = router;
