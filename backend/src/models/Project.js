const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startDate: Date,
    deadline: Date,

    progress: {
      type: Number,
      default: 0, // %
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    completedAt: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
