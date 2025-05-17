const express = require("express");
const {
  getCampaignActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  registerForActivity,
  getActivitiesCount,
} = require("../controllers/activities");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getCampaignActivities)
  .post(protect, authorize("admin", "leader"), createActivity);

router
  .route("/:id")
  .put(protect, authorize("admin", "leader"), updateActivity)
  .delete(protect, authorize("admin", "leader"), deleteActivity);

router.get("/count", protect, getActivitiesCount);

router.post("/:id/register", protect, registerForActivity);

module.exports = router;
