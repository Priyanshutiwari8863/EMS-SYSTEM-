const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    companyName: {
      type: String,
      default: "My Company Pvt Ltd"
    },

    address: String,
    email: String,
    phone: String,

    logo: String,

    // 🔥 LEAVE POLICY
    paidLeavesPerMonth: {
      type: Number,
      default: 3
    },

    workingDaysPerMonth: {
      type: Number,
      default: 26
    },

    // 🏦 BANK DETAILS
    bankName: String,
    accountNumber: String,
    ifsc: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanySettings", companySchema);
