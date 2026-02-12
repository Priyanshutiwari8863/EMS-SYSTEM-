const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/email");
const crypto = require("crypto");

exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    console.log("USER FOUND:", user ? "YES" : "NO");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 VERY IMPORTANT — clean role
    const role = (user.role || "employee").trim().toLowerCase();

    // 3️⃣ Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: role,   // ✅ clean role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Send response
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min
    await user.save();

    const link = `http://localhost:5173/reset-password/${token}`;

    await sendMail(
      email,
      "Reset Password",
      `<h3>Click below to reset password</h3>
       <a href="${link}">${link}</a>`
    );

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
