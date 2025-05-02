  const mongoose = require("mongoose");

  const memberSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
      },
      role: {
        type: String,
        enum: ["leader", "member"],
        default: "member",
      },
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      responsibilities: [String],
      status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

  // Ensure one user can only be a member of a campaign once
  memberSchema.index({ user: 1, campaign: 1 }, { unique: true });

  module.exports = mongoose.model("Member", memberSchema);
