const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/project.controller");


// ADMIN
router.post("/", auth("Admin", "Manager"), controller.createProject);
router.get("/", auth("Admin", "Manager"), controller.getAllProjects);


// EMPLOYEE
router.get("/my", auth(), controller.getMyProjects);
router.put("/:id", auth(), controller.updateProgress);


module.exports = router;
