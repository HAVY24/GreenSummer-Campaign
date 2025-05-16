import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createActivity } from "../../api/activities";
import ActivityForm from "../../components/activities/ActivityForm";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";

const CreateActivity = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (activityData) => {
    setLoading(true);
    setError(null);

    try {
      await createActivity(campaignId, activityData);
      navigate(`/campaigns/${campaignId}/activities`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create activity");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        to={`/campaigns/${campaignId}/activities`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Activities
      </Link>

      <Card>
        <h1 className="text-2xl font-bold mb-6">Create New Activity</h1>

        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        <ActivityForm onSubmit={handleSubmit} isSubmitting={loading} />
      </Card>
    </div>
  );
};

export default CreateActivity;
