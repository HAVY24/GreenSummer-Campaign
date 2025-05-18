const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
// controllers/auth.js
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        errorType: "USERNAME_NOT_FOUND",
        message: "Tài khoản không tồn tại",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errorType: "WRONG_PASSWORD",
        message: "Mật khẩu không chính xác",
      });
    }

    // Đăng nhập thành công
    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống",
    });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Register a new user (Admin only)
// @route   POST /api/auth/register
// @access  Private/Admin
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, role, phone } = req.body;

  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    fullName,
    role,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ẩn mật khẩu
    res.json(users);
  } catch (error) {
    console.error("Get users failed:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  getUserProfile,
  registerUser,
  getAllUsers,
};
