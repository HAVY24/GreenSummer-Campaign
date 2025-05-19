import api from "./index";

// Get all activities for a campaign
export const getActivitiesByCampaign = async (campaignId) => {
  const response = await api.get(`/api/campaigns/${campaignId}/activities`);
  return response.data;
};

// Create an activity (Admin or Leader)
export const createActivity = async (campaignId, activityData) => {
  const response = await api.post(
    `/api/campaigns/${campaignId}/activities`,
    activityData
  );
  return response.data;
};

// Update an activity (Admin or Leader)
export const updateActivity = async (id, activityData) => {
  const response = await api.put(`/api/activities/${id}`, activityData);
  return response.data;
};

// Delete an activity (Admin or Leader)
export const deleteActivity = async (id) => {
  const response = await api.delete(`/api/activities/${id}`);
  return response.data;
};

// Register for an activity
export const registerForActivity = async (id) => {
  const response = await api.post(`/api/activities/${id}/register`);
  return response.data;
};

// Get activities count
export const getActivitiesCount = async () => {
  const response = await api.get("/api/activities/count");
  return response.data;
};

export const getActivity = async (id) => {
  const response = await api.get(`/api/activities/${id}`);
  return response.data;
};

export const getActivityById = async (campaignId, id) => {
  const response = await api.get(
    `/api/campaigns/${campaignId}/activities/${id}`
  );
  return response.data;
};
