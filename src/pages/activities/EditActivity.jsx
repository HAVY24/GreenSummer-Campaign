import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getActivity, updateActivity } from "../../api/activities";
import ActivityForm from "../../components/activities/ActivityForm";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";

const EditActivity = () => {
  const { campaignId, activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivity(activityId);
        setActivity(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load activity details");
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  const handleSubmit = async (activityData) => {
    setSubmitting(true);
    setError(null);

    try {
      await updateActivity(activityId, activityData);
      navigate(`/campaigns/${campaignId}/activities/${activityId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update activity");
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading activity details...</div>
    );
  if (error && !activity)
    return <div className="text-red-500 p-8">{error}</div>;
  if (!activity)
    return <div className="text-center p-8">Activity not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link
        to={`/campaigns/${campaignId}/activities/${activityId}`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Activity Details
      </Link>

      <Card>
        <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>

        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        <ActivityForm
          onSubmit={handleSubmit}
          isSubmitting={submitting}
          initialData={activity}
          isEditing={true}
        />
      </Card>
    </div>
  );
};

export default EditActivity;
