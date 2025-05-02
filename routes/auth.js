const express = require("express");
const {
  loginUser,
  getUserProfile,
  registerUser,
} = require("../controllers/auth");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);

module.exports = router;
