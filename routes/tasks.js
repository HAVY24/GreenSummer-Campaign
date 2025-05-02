const express = require("express");
const {
  getCampaignTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksCount,
} = require("../controllers/tasks");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getCampaignTasks)
  .post(protect, authorize("admin", "leader"), createTask);

router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, authorize("admin", "leader"), deleteTask);

router.get("/count", protect, getTasksCount);

module.exports = router;
