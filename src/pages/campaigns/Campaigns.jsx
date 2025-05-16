import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../api/campaigns";
import CampaignList from "../../components/campaigns/CampaignList";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../hooks/useAuth";

const Campaigns = () => {
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
        setError("Không thể tải chiến dịch. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải chiến dịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Chiến dịch</h1>
        {user && user.role === "admin" && (
          <Link to="/campaigns/create">
            <Button variant="primary">
              <span className="mr-2">+</span> Tạo chiến dịch mới
            </Button>
          </Link>
        )}
      </div>

      {error && <Alert variant="error" message={error} className="mb-4" />}

      {campaigns.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">Chưa có chiến dịch nào.</p>
          {user && user.role === "admin" && (
            <Link to="/campaigns/create">
              <Button variant="link" className="mt-2">
                Tạo chiến dịch đầu tiên
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <CampaignList campaigns={campaigns} />
      )}
    </div>
  );
};

export default Campaigns;
