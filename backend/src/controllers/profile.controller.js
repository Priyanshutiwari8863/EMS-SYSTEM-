const Employee = require("../models/Employee");

exports.getProfile = async (req, res) => {
  const emp = await Employee.findOne({ user: req.user.id });
  res.json(emp);
};

exports.updateProfile = async (req, res) => {
  const emp = await Employee.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(emp);
};

exports.uploadPhoto = async (req, res) => {
  const emp = await Employee.findOneAndUpdate(
    { user: req.user.id },
    {
      profilePic: `/uploads/${req.file.filename}`
    },
    { new: true }
  );

  res.json(emp);
};
