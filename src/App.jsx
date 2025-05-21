import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages - Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Pages - Dashboard & Home
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";

// Pages - Campaigns
import Campaigns from "./pages/campaigns/Campaigns";
import CampaignDetail from "./pages/campaigns/CampaignDetail";
import CreateCampaign from "./pages/campaigns/CreateCampaign";
import EditCampaign from "./pages/campaigns/EditCampaign";

// Pages - Activities
import Activities from "./pages/activities/Activities";
import ActivityDetail from "./pages/activities/ActivityDetail";
import CreateActivity from "./pages/activities/CreateActivity";
import EditActivity from "./pages/activities/EditActivity";

// Pages - Members
import Members from "./pages/members/Members";
import ManageMembers from "./pages/members/ManageMembers";

// Pages - Tasks
import Tasks from "./pages/tasks/Tasks";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";

// Pages - Profile
import Profile from "./pages/profile/Profile";

// Pages - Error
import NotFound from "./pages/NotFound";

// Auth related
import useAuth from "./hooks/useAuth";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating initial app loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-green-800">
            Đang tải Mùa Hè Xanh...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with AppLayout */}
        <Route path="/" element={<AppLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Campaign Routes */}
          <Route
            path="campaigns"
            element={
              <ProtectedRoute>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:id"
            element={
              <ProtectedRoute>
                <CampaignDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditCampaign />
              </ProtectedRoute>
            }
          />

          {/* Activity Routes */}
          <Route
            path="campaigns/:campaignId/activities"
            element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/activities/:activityId"
            element={
              <ProtectedRoute>
                <ActivityDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/activities/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "leader"]}>
                <CreateActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/activities/:activityId/edit"
            element={
              <ProtectedRoute allowedRoles={["admin", "leader"]}>
                <EditActivity />
              </ProtectedRoute>
            }
          />

          {/* Member Routes */}
          <Route
            path="campaigns/:campaignId/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/members/manage"
            element={
              <ProtectedRoute allowedRoles={["admin", "leader"]}>
                <ManageMembers />
              </ProtectedRoute>
            }
          />

          {/* Task Routes */}
          <Route
            path="campaigns/:campaignId/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/tasks/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "leader"]}>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaigns/:campaignId/tasks/:taskId/edit"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />

          {/* Profile Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
