import api from "./index";

// Get all tasks for a campaign
export const getTasks = async (campaignId) => {
  const response = await api.get(`/campaigns/${campaignId}/tasks`);
  return response.data;
};

// Create a task (Admin or Leader)
export const createTask = async (campaignId, taskData) => {
  const response = await api.post(`/campaigns/${campaignId}/tasks`, taskData);
  return response.data;
};

// Update a task (Admin, Leader, or AssignedTo)
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task (Admin or Leader)
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// Get tasks count
export const getTasksCount = async () => {
  const response = await api.get("/tasks/count");
  return response.data;
};

export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};
