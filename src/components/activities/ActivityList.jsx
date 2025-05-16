import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getActivitiesByCampaign } from "../../api/activities";
import ActivityCard from "./ActivityCard";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { campaignId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivitiesByCampaign(campaignId);
        setActivities(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Could not fetch activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center my-4">{error}</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center my-8">
        <p className="text-gray-600 mb-4">
          Chưa có hoạt động nào trong chiến dịch này
        </p>
        {(user?.role === "admin" || user?.role === "leader") && (
          <Link to={`/campaigns/${campaignId}/activities/create`}>
            <Button>Tạo hoạt động mới</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Danh sách hoạt động</h2>
        {(user?.role === "admin" || user?.role === "leader") && (
          <Link to={`/campaigns/${campaignId}/activities/create`}>
            <Button>Tạo hoạt động mới</Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            campaignId={campaignId}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
