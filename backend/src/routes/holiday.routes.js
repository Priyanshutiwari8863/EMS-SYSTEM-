const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/holiday.controller");

// all logged-in users
router.get("/", auth(), c.getHolidays);

// admin only
router.post("/", auth("admin"), c.addHoliday);
router.delete("/:id", auth("admin"), c.deleteHoliday);

module.exports = router;
