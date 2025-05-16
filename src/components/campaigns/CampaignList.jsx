import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../api/campaigns";
import CampaignCard from "./CampaignCard";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns");
        setLoading(false);
        console.error(err);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading campaigns...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">All Campaigns</h2>
        {user && user.role === "admin" && (
          <Link to="/campaigns/create">
            <Button>Create Campaign</Button>
          </Link>
        )}
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No campaigns found.
          {user && user.role === "admin" && (
            <div className="mt-4">
              <Link to="/campaigns/create">
                <Button>Create Your First Campaign</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
