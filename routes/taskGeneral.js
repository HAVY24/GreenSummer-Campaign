const express = require("express");
const { getTasksCount } = require("../controllers/tasks");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/count", protect, getTasksCount);

module.exports = router;
