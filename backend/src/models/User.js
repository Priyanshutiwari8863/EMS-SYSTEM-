const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },

    // ================= PROFILE SYSTEM =================
    profilePhoto: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    position: {
      type: String,
      default: "",
    },

    joiningDate: {
      type: Date,
    },

    // ================= PASSWORD RESET SYSTEM =================
    resetToken: {
      type: String,
      default: "",
    },

    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
