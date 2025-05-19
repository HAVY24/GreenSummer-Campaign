import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getActivityById, registerForActivity } from "../../api/activities";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import { formatDate } from "../../utils/formatDate";
import { formatStatus } from "../../utils/formatStatus";
import { useAuth } from "../../hooks/useAuth";
import { roleCheck } from "../../utils/roleCheck";

const ActivityDetail = () => {
  const { campaignId, activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivityById(campaignId, activityId);
        setActivity(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load activity details");
        setLoading(false);
      }
    };

    fetchActivity();
  }, [campaignId, activityId]);

  const handleRegister = async () => {
    setRegistering(true);
    setRegisterError(null);
    try {
      await registerForActivity(activityId);
      // Refresh activity data to show updated participants
      const updatedActivity = await getActivity(activityId);
      setActivity(updatedActivity);
    } catch (err) {
      setRegisterError(
        err.response?.data?.message || "Failed to register for activity"
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading activity details...</div>
    );
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!activity)
    return <div className="text-center p-8">Activity not found</div>;

  const isRegistered = activity.participants?.some(
    (participant) => participant._id === user?.id
  );

  const isOrganizer = activity.organizer?._id === user?.id;

  return (
    <div className="container mx-auto p-4">
      <Link
        to={`/campaigns/${campaignId}/activities`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Activities
      </Link>

      <Card className="mb-6">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{activity.name}</h1>
            <div className="mt-2">
              <Badge color={formatStatus(activity.status).color}>
                {formatStatus(activity.status).label}
              </Badge>
            </div>
          </div>

          {roleCheck.hasRequiredRole(user?.role, ["admin", "leader"]) && (
            <Link to={`/campaigns/${campaignId}/activities/${activityId}/edit`}>
              <Button variant="secondary">Edit Activity</Button>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p className="text-gray-700 mb-4">{activity.description}</p>

            <div className="space-y-2">
              <p>
                <span className="font-medium">Start:</span>{" "}
                {formatDate(activity.startTime)}
              </p>
              <p>
                <span className="font-medium">End:</span>{" "}
                {formatDate(activity.endTime)}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {activity.location}
              </p>
              <p>
                <span className="font-medium">Organizer:</span>{" "}
                {activity.organizer?.fullName || "Unknown"}
              </p>
            </div>

            {activity.requirements?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Requirements:</h3>
                <ul className="list-disc list-inside">
                  {activity.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activity.notes && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Notes:</h3>
                <p className="text-gray-700">{activity.notes}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Participants ({activity.participants?.length || 0})
            </h2>

            {!isRegistered &&
              !isOrganizer &&
              activity.status === "upcoming" && (
                <div className="mb-4">
                  <Button
                    variant="primary"
                    onClick={handleRegister}
                    disabled={registering}
                  >
                    {registering
                      ? "Registering..."
                      : "Register for this Activity"}
                  </Button>
                  {registerError && (
                    <p className="text-red-500 mt-2">{registerError}</p>
                  )}
                </div>
              )}

            {isRegistered && (
              <div className="mb-4 p-2 bg-green-50 text-green-700 rounded border border-green-200">
                You are registered for this activity
              </div>
            )}

            {activity.participants?.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                {activity.participants.map((participant) => (
                  <div
                    key={participant._id}
                    className="py-2 border-b last:border-0"
                  >
                    <p className="font-medium">{participant.fullName}</p>
                    <p className="text-gray-500 text-sm">
                      {participant.username}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No participants yet</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActivityDetail;
