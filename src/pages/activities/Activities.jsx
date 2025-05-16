import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getActivitiesByCampaign } from "../../api/activities";
import ActivityList from "../../components/activities/ActivityList";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { roleCheck } from "../../utils/roleCheck";

const Activities = () => {
  const { campaignId } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivitiesByCampaign(campaignId);
        setActivities(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, [campaignId]);

  if (loading)
    return <div className="flex justify-center p-8">Loading activities...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign Activities</h1>
        {roleCheck(user, ["admin", "leader"]) && (
          <Link to={`/campaigns/${campaignId}/activities/create`}>
            <Button variant="primary">Create Activity</Button>
          </Link>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No activities found for this campaign</p>
        </div>
      ) : (
        <ActivityList activities={activities} />
      )}
    </div>
  );
};

export default Activities;
