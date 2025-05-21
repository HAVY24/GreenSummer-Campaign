import api from "./index";

// Get all tasks for a campaign
export const getTasks = async (campaignId) => {
  
  const response = await api.get(`/api/campaigns/${campaignId}/tasks`);
  return response.data;
};

// Create a task (Admin or Leader)
export const createTask = async (campaignId, taskData) => {
  const response = await api.post(`/api/campaigns/${campaignId}/tasks`, taskData);
  return response.data;
};

// Update a task (Admin, Leader, or AssignedTo)
export const updateTask = async (id,campaignId, taskData) => {
  const response = await api.put(`api/campaigns/${campaignId}/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task (Admin or Leader)
export const deleteTask = async (id, campaignId) => {
  const response = await api.delete(`api/campaigns/${campaignId}/tasks/${id}`);
  return response.data;
};

// Get tasks count
export const getTasksCount = async () => {
  const response = await api.get("/api/tasks/count");
  return response.data;
};

export const getTask = async (id,campaignId) => {
  if (!id) {
    throw new Error("Task ID is required");
  }
  if (!campaignId) {
    throw new Error("Campaign ID is required");
  }
  const response = await api.get(`api/campaigns/${campaignId}/tasks/${id}`); 
  return response.data;
};
