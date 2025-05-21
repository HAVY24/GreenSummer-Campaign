const Member = require("../models/Member");
const User = require("../models/User");
const Campaign = require("../models/Campaign");
const asyncHandler = require("express-async-handler");

// @desc    Get all members for a campaign
// @route   GET /api/campaigns/:campaignId/members
// @access  Private
const getCampaignMembers = asyncHandler(async (req, res) => {
  const members = await Member.find({ campaign: req.params.campaignId })
    .populate("user", "username fullName email role")
    .populate("campaign", "name");

  res.json(members);
});

// @desc    Add member to campaign
// @route   POST /api/campaigns/:campaignId/members
// @access  Private/Admin or Leader
const addCampaignMember = asyncHandler(async (req, res) => {
  const { userId, role, responsibilities } = req.body;

  const user = await User.findById(userId);
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!user || !campaign) {
    res.status(404);
    throw new Error("User or campaign not found");
  }

  // Check if user is already a member
  const existingMember = await Member.findOne({
    user: userId,
    campaign: req.params.campaignId,
  });

  if (existingMember) {
    res.status(400);
    throw new Error("User is already a member of this campaign");
  }

  const member = await Member.create({
    user: userId,
    campaign: req.params.campaignId,
    role,
    responsibilities,
  });

  res.status(201).json(member);
});

// @desc    Update member role
// @route   PUT /api/campaigns/:campaignId/members/:memberId
// @access  Private/Admin or Leader
const updateCampaignMember = asyncHandler(async (req, res) => {
  const { role, responsibilities, status } = req.body;

  const member = await Member.findOne({
    _id: req.params.memberId,
    campaign: req.params.campaignId,
  });

  if (!member) {
    res.status(404);
    throw new Error("Member not found in this campaign");
  }

  member.role = role || member.role;
  member.responsibilities = responsibilities || member.responsibilities;
  member.status = status || member.status;

  const updatedMember = await member.save();
  res.json(updatedMember);
});

// @desc    Remove member from campaign
// @route   DELETE /api/campaigns/:campaignId/members/:memberId
// @access  Private/Admin or Leader
const removeCampaignMember = asyncHandler(async (req, res) => {
  const member = await Member.findOne({
    _id: req.params.memberId,
    campaign: req.params.campaignId,
  });

  if (!member) {
    res.status(404);
    throw new Error("Member not found in this campaign");
  }

  await Member.deleteOne({ _id: member._id });
  res.json({ message: "Member removed from campaign" });
});

const getMembersCount = asyncHandler(async (req, res) => {
  const count = await Member.countDocuments();
  res.json({ count });
});

module.exports = {
  getCampaignMembers,
  addCampaignMember,
  updateCampaignMember,
  removeCampaignMember,
  getMembersCount,
};
