const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");

// Route files
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaigns");
const memberRoutes = require("./routes/members");
const activityRoutes = require("./routes/campaignActivities");
const taskRoutes = require("./routes/tasks");
const activityGeneralRoutes = require("./routes/activityGeneral");
const memberGeneralRoutes = require("./routes/memberGeneral");
const taskGeneralRoutes = require("./routes/taskGeneral");
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/campaigns/:campaignId/members", memberRoutes);
app.use("/api/campaigns/:campaignId/activities", activityRoutes);
app.use("/api/campaigns/:campaignId/tasks", taskRoutes);
app.use("/api/activities", activityGeneralRoutes);
app.use("/api/members", memberGeneralRoutes);
app.use("/api/tasks", taskGeneralRoutes);
// Error handling middleware
app.use(errorHandler);

module.exports = app;
