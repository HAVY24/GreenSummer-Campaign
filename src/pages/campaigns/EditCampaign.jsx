import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCampaignById, updateCampaign } from "../../api/campaigns";
import CampaignForm from "../../components/campaigns/CampaignForm";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../hooks/useAuth";

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignById(id);
        setCampaign(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin chiến dịch. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // Ensure only admins can access this page
  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          variant="error"
          message="Bạn không có quyền chỉnh sửa chiến dịch"
          className="mb-4"
        />
        <Link to="/campaigns" className="text-green-600 hover:text-green-700">
          Quay lại danh sách chiến dịch
        </Link>
      </div>
    );
  }

  const handleSubmit = async (campaignData) => {
    setSubmitting(true);
    setError(null);

    try {
      await updateCampaign(id, campaignData);
      navigate(`/campaigns/${id}`);
    } catch (err) {
      setError("Không thể cập nhật chiến dịch. Vui lòng thử lại sau.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin chiến dịch...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          variant="error"
          message={error || "Không tìm thấy chiến dịch"}
          className="mb-4"
        />
        <Link to="/campaigns" className="text-green-600 hover:text-green-700">
          Quay lại danh sách chiến dịch
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/campaigns/${id}`}
        className="text-green-600 hover:text-green-700 mb-6 block"
      >
        &larr; Trở về chi tiết chiến dịch
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Chỉnh sửa chiến dịch
      </h1>

      {error && <Alert variant="error" message={error} className="mb-4" />}

      <Card>
        <div className="p-6">
          <CampaignForm
            onSubmit={handleSubmit}
            loading={submitting}
            initialData={campaign}
            isEditing={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default EditCampaign;
