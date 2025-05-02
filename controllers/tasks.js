const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// @desc    Get all tasks for a campaign
// @route   GET /api/campaigns/:campaignId/tasks
// @access  Private
const getCampaignTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ campaign: req.params.campaignId })
    .populate("assignedTo", "username fullName")
    .populate("assignedBy", "username fullName");

  res.json(tasks);
});

// @desc    Create a task
// @route   POST /api/campaigns/:campaignId/tasks
// @access  Private/Admin or Leader
const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, dueDate, priority } = req.body;

  const task = await Task.create({
    title,
    description,
    campaign: req.params.campaignId,
    assignedTo,
    assignedBy: req.user._id,
    dueDate,
    priority,
  });

  res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin or Leader or AssignedTo
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if user is authorized to update
  if (
    req.user.role !== "admin" &&
    req.user.role !== "leader" &&
    task.assignedTo.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  const {
    title,
    description,
    assignedTo,
    dueDate,
    status,
    priority,
    completionNotes,
  } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.assignedTo = assignedTo || task.assignedTo;
  task.dueDate = dueDate || task.dueDate;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.completionNotes = completionNotes || task.completionNotes;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin or Leader
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.remove();
  res.json({ message: "Task removed" });
});

const getTasksCount = asyncHandler(async (req, res) => {
  const count = await Task.countDocuments();
  res.json({ count });
});

module.exports = {
  getCampaignTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksCount,
};
