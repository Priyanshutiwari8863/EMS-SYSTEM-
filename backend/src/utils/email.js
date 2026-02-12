const nodemailer = require("nodemailer");

// 🔐 create transporter only once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// 📩 send mail function
exports.sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"EMS HR" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw new Error("Email sending failed");
  }
};
