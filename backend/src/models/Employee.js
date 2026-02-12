const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    // 🔗 linked login user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    department: {
      type: String,
      index: true
    },

    position: String,

    profilePic: {
     type: String
    },

    salary: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
