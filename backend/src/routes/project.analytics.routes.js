const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/project.analytics.controller");

router.get("/", auth(), controller.getProjectAnalytics);

module.exports = router;
