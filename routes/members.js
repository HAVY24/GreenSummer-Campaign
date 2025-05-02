const express = require("express");
const {
  getCampaignMembers,
  addCampaignMember,
  updateCampaignMember,
  removeCampaignMember,
  getMembersCount,
} = require("../controllers/members");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getCampaignMembers)
  .post(protect, authorize("admin", "leader"), addCampaignMember);

router
  .route("/:memberId")
  .put(protect, authorize("admin", "leader"), updateCampaignMember)
  .delete(protect, authorize("admin", "leader"), removeCampaignMember);

router.get("/count", protect, getMembersCount);

module.exports = router;
