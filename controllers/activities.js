const Activity = require("../models/Activity");
const asyncHandler = require("express-async-handler");

// @desc    Get all activities for a campaign
// @route   GET /api/campaigns/:campaignId/activities
// @access  Private
const getCampaignActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ campaign: req.params.campaignId })
    .populate("organizer", "username fullName")
    .populate("participants", "username fullName");

  res.json(activities);
});

// @desc    Create an activity
// @route   POST /api/campaigns/:campaignId/activities
// @access  Private/Admin or Leader
const createActivity = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startTime,
    endTime,
    location,
    requirements,
    notes,
  } = req.body;

  const activity = await Activity.create({
    name,
    description,
    campaign: req.params.campaignId,
    startTime,
    endTime,
    location,
    organizer: req.user._id,
    requirements,
    notes,
  });

  res.status(201).json(activity);
});

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private/Admin or Leader
const updateActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  const {
    name,
    description,
    startTime,
    endTime,
    location,
    status,
    requirements,
    notes,
  } = req.body;

  activity.name = name || activity.name;
  activity.description = description || activity.description;
  activity.startTime = startTime || activity.startTime;
  activity.endTime = endTime || activity.endTime;
  activity.location = location || activity.location;
  activity.status = status || activity.status;
  activity.requirements = requirements || activity.requirements;
  activity.notes = notes || activity.notes;

  const updatedActivity = await activity.save();
  res.json(updatedActivity);
});

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private/Admin or Leader
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  await activity.remove();
  res.json({ message: "Activity removed" });
});

// @desc    Register for an activity
// @route   POST /api/activities/:id/register
// @access  Private
const registerForActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  // Check if user is already registered
  const isRegistered = activity.participants.includes(req.user._id);
  if (isRegistered) {
    res.status(400);
    throw new Error("Already registered for this activity");
  }

  activity.participants.push(req.user._id);
  await activity.save();

  res.json({ message: "Registered for activity successfully" });
});

const getActivitiesCount = asyncHandler(async (req, res) => {
  const count = await Activity.countDocuments();
  res.json({ count });
});

const getActivityById = asyncHandler(async (req, res) => {
  const { campaignId, id } = req.params;

  const activity = await Activity.findOne({ _id: id, campaign: campaignId })
    .populate("organizer", "username fullName")
    .populate("participants", "username fullName");

  if (!activity) {
    res.status(404);
    throw new Error("Không tìm thấy hoạt động");
  }

  res.json(activity);
});

module.exports = {
  getCampaignActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  registerForActivity,
  getActivitiesCount,
  getActivityById,
};
