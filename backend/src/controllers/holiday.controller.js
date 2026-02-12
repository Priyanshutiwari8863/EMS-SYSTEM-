const Holiday = require("../models/Holiday");

exports.addHoliday = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body missing. Send JSON body."
      });
    }

    const { date, name } = req.body;

    if (!date || !name) {
      return res.status(400).json({
        message: "Both date and name are required"
      });
    }

    const exists = await Holiday.findOne({ date });
    if (exists) {
      return res.status(400).json({
        message: "Holiday already exists"
      });
    }

    const holiday = await Holiday.create({ date, name });

    res.status(201).json(holiday);

  } catch (err) {
    console.error("ADD HOLIDAY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHolidays = async (req, res) => {
  const holidays = await Holiday.find().sort({ date: 1 });
  res.json(holidays);
};

exports.deleteHoliday = async (req, res) => {
  await Holiday.findByIdAndDelete(req.params.id);
  res.json({ message: "Holiday deleted" });
};
