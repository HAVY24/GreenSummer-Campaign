import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCampaign } from "../../api/campaigns";
import CampaignForm from "../../components/campaigns/CampaignForm";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../hooks/useAuth";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ensure only admins can access this page
  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          variant="error"
          message="Bạn không có quyền tạo chiến dịch"
          className="mb-4"
        />
        <Link to="/campaigns" className="text-green-600 hover:text-green-700">
          Quay lại danh sách chiến dịch
        </Link>
      </div>
    );
  }

  const handleSubmit = async (campaignData) => {
    setLoading(true);
    setError(null);

    try {
      const newCampaign = await createCampaign(campaignData);
      navigate(`/campaigns/${newCampaign._id}`);
    } catch (err) {
      setError("Không thể tạo chiến dịch. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/campaigns"
        className="text-green-600 hover:text-green-700 mb-6 block"
      >
        &larr; Trở về danh sách chiến dịch
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tạo chiến dịch mới
      </h1>

      {error && <Alert variant="error" message={error} className="mb-4" />}

      <Card>
        <div className="p-6">
          <CampaignForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </Card>
    </div>
  );
};

export default CreateCampaign;
