const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../utils/upload");
const controller = require("../controllers/company.controller");

/* ===============================
   GET SETTINGS
================================= */
router.get("/", auth("admin"), controller.getSettings);

/* ===============================
   UPDATE SETTINGS
================================= */
router.put("/", auth("admin"), controller.updateSettings);

/* ===============================
   UPLOAD LOGO
================================= */
router.put(
  "/logo",
  auth("admin"),
  upload.single("logo"),
  controller.uploadLogo
);

module.exports = router;
