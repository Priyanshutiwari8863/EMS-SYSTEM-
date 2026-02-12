const Company = require("../models/CompanySettings");

/* ===============================
   GET COMPANY SETTINGS
================================= */
exports.getSettings = async (req, res) => {
  try {
    let settings = await Company.findOne({
      user: req.user.id,
    });

    // agar first time ho → auto create
    if (!settings) {
      settings = await Company.create({
        user: req.user.id,
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE COMPANY SETTINGS
================================= */
exports.updateSettings = async (req, res) => {
  try {
    const updated = await Company.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPLOAD COMPANY LOGO
================================= */
exports.uploadLogo = async (req, res) => {
  try {
    const updated = await Company.findOneAndUpdate(
      { user: req.user.id },
      { logo: `/uploads/${req.file.filename}` },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
