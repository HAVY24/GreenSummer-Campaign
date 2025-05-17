import api from "./index";

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
};

// Register user (Admin only)
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put("/api/auth/profile", userData);
  return response.data;
};
