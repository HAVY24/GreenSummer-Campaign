const express = require("express");
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignsCount,
} = require("../controllers/campaigns");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(getCampaigns)
  .post(protect, authorize("admin"), createCampaign);

router
  .route("/:id")
  .get(getCampaignById)
  .put(protect, authorize("admin"), updateCampaign)
  .delete(protect, authorize("admin"), deleteCampaign);

router.get("/count", protect, getCampaignsCount);
// Thêm vào routes/campaigns.js

module.exports = router;
