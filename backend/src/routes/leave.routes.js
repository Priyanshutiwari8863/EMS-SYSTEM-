const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/leave.controller");

// employee apply leave
router.post("/", auth(), controller.applyLeave);

// admin view all leaves
router.get("/", auth("admin"), controller.getAllLeaves);

// admin approve / reject
router.put("/:id", auth("admin"), controller.updateStatus);

module.exports = router;
