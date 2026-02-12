const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../utils/upload");
const controller = require("../controllers/profile.controller");

// 🔹 get profile
router.get("/", auth(), controller.getProfile);

// 🔹 update profile details
router.put("/", auth(), controller.updateProfile);

// 🔹 upload profile photo
router.put(
  "/photo",
  auth(),
  upload.single("photo"),
  controller.uploadPhoto
);

module.exports = router;
