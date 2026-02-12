const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true
  },
  name: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Holiday", holidaySchema);
