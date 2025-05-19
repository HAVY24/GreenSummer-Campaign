import React from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

const ActivityList = ({ activities, campaignId }) => {
  const { user } = useAuth();

  if (!activities) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
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
