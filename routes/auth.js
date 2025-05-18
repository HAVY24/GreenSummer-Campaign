const express = require("express");
const {
  loginUser,
  getUserProfile,
  registerUser,
  getAllUsers,
} = require("../controllers/auth");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);
router.get("/users", protect, getAllUsers);

module.exports = router;
