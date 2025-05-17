import api from "./index";

// Get all members for a campaign
export const getCampaignMembers = async (campaignId) => {
  const response = await api.get(`/api/campaigns/${campaignId}/members`);
  return response.data;
};

// Add member to campaign (Admin or Leader)
export const addCampaignMember = async (campaignId, memberData) => {
  const response = await api.post(
    `/api/campaigns/${campaignId}/members`,
    memberData
  );
  return response.data;
};

// Update member role (Admin or Leader)
export const updateCampaignMember = async (
  campaignId,
  memberId,
  memberData
) => {
  const response = await api.put(
    `/api/campaigns/${campaignId}/members/${memberId}`,
    memberData
  );
  return response.data;
};

// Remove member from campaign (Admin or Leader)
export const removeCampaignMember = async (campaignId, memberId) => {
  const response = await api.delete(
    `/api/campaigns/${campaignId}/members/${memberId}`
  );
  return response.data;
};

// Get members count
export const getMembersCount = async () => {
  const response = await api.get("/api/members/count");
  return response.data;
};
