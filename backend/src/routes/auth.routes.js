const express = require("express");
const router = express.Router();

// 🔥 import full controller object
const controller = require("../controllers/auth.controller");
const passport = require("../config/passport");

// routes
router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);


/* ================= GOOGLE LOGIN ================= */

// step 1 → redirect to google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// step 2 → callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    const { token } = req.user;

    // redirect frontend with token
    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
  }
);

module.exports = router;
