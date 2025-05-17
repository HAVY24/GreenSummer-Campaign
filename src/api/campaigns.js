import api from "./index";

// Get all campaigns
export const getCampaigns = async () => {
  const response = await api.get("/api/campaigns");
  return response.data;
};

// Get single campaign
export const getCampaignById = async (id) => {
  const response = await api.get(`/api/campaigns/${id}`);
  return response.data;
};

// Create a campaign (Admin only)
export const createCampaign = async (campaignData) => {
  const response = await api.post("/api/campaigns", campaignData);
  return response.data;
};

// Update a campaign (Admin only)
export const updateCampaign = async (id, campaignData) => {
  const response = await api.put(`/api/campaigns/${id}`, campaignData);
  return response.data;
};

// Delete a campaign (Admin only)
export const deleteCampaign = async (id) => {
  const response = await api.delete(`/api/campaigns/${id}`);
  return response.data;
};

// Get campaigns count
export const getCampaignsCount = async () => {
  const response = await api.get("/api/campaigns/count");
  return response.data;
};
