const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/task.controller");

router.post("/", auth(), controller.createTask);
router.get("/:projectId", auth(), controller.getTasks);
router.put("/:id", auth(), controller.updateTask);

module.exports = router;
