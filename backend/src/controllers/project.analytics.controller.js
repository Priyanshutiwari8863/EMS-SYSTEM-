const Project = require("../models/Project");

exports.getProjectAnalytics = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    });

    const total = projects.length;

    const completed = projects.filter(
      (p) => p.status === "completed"
    ).length;

    const inProgress = projects.filter(
      (p) => p.status === "in-progress"
    ).length;

    const pending = projects.filter(
      (p) => p.status === "pending"
    ).length;

    const avgProgress =
      total === 0
        ? 0
        : Math.round(
            projects.reduce((s, p) => s + p.progress, 0) / total
          );

    res.json({
      total,
      completed,
      inProgress,
      pending,
      avgProgress,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
