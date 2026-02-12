const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS BY PROJECT
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TASK STATUS + AUTO PROJECT PROGRESS
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // 🔥 AUTO PROJECT PROGRESS CALCULATION
    const tasks = await Task.find({ project: task.project });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;

    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    await Project.findByIdAndUpdate(task.project, {
      progress,
      status:
        progress === 100
          ? "completed"
          : progress > 0
          ? "in-progress"
          : "pending",
      completedAt: progress === 100 ? new Date() : null,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
