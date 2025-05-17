const express = require("express");
const { getActivitiesCount } = require("../controllers/activities");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/count", protect, getActivitiesCount);

module.exports = router;
