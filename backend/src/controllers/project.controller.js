const Project = require("../models/Project");


// ================= ADMIN — CREATE PROJECT =================
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= ADMIN — GET ALL PROJECTS =================
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    }).populate("assignedTo", "name email role");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= EMPLOYEE — MY PROJECTS =================
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      assignedTo: req.user.id,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= EMPLOYEE — UPDATE PROGRESS =================
exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const updateData = {
      progress,
      status:
        progress === 100 ? "completed" : "in-progress",
    };

    // ✅ auto complete date
    if (progress === 100) {
      updateData.completedAt = new Date();
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
