const express = require("express");
const { getMembersCount } = require("../controllers/members");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/count", protect, getMembersCount);

module.exports = router;
