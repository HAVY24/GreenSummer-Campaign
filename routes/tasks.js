const express = require("express");
const {
  getCampaignTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksCount,
  getTask,
} = require("../controllers/tasks");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getCampaignTasks)
  .post(protect, authorize("admin", "leader"), createTask);

  
  router.get("/count", protect, getTasksCount);
  router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, authorize("admin", "leader"), deleteTask);
  

module.exports = router;
