const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/analytics.controller");

router.get("/", auth("admin"), controller.getSalaryAnalytics);

module.exports = router;
