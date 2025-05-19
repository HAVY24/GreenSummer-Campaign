const Campaign = require("../models/Campaign");
const asyncHandler = require("express-async-handler");

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({}).populate(
    "createdBy",
    "username fullName"
  );
  res.json(campaigns);
});

// @desc    Get single campaign
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    "createdBy",
    "username fullName"
  );

  if (campaign) {
    res.json(campaign);
  } else {
    res.status(404);
    throw new Error("Campaign not found");
  }
});

// @desc    Create a campaign
// @route   POST /api/campaigns
// @access  Private/Admin
const createCampaign = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    status,
    objectives,
    requirements,
  } = req.body;

  const campaign = await Campaign.create({
    name,
    description,
    startDate,
    endDate,
    location,
    status,
    objectives,
    requirements,
    createdBy: req.user._id,
  });

  if (campaign) {
    res.status(201).json(campaign);
  } else {
    res.status(400);
    throw new Error("Invalid campaign data");
  }
});

// @desc    Update a campaign
// @route   PUT /api/campaigns/:id
// @access  Private/Admin
const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  const {
    name,
    description,
    startDate,
    endDate,
    location,
    status,
    objectives,
    requirements,
  } = req.body;

  campaign.name = name || campaign.name;
  campaign.description = description || campaign.description;
  campaign.startDate = startDate || campaign.startDate;
  campaign.endDate = endDate || campaign.endDate;
  campaign.location = location || campaign.location;
  campaign.status = status || campaign.status;
  campaign.objectives = objectives || campaign.objectives;
  campaign.requirements = requirements || campaign.requirements;

  const updatedCampaign = await campaign.save();
  res.json(updatedCampaign);
});

// @desc    Delete a campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin
const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  await campaign.deleteOne();
  res.json({ message: "Campaign removed" });
});

// Thêm vào controllers/campaigns.js
const getCampaignsCount = asyncHandler(async (req, res) => {
  const count = await Campaign.countDocuments();
  res.json({ count });
});

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignsCount,
};
