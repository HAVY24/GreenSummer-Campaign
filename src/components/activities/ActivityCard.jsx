import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import Badge from "../ui/Badge";
import { useAuth } from "../../hooks/useAuth";

const ActivityCard = ({ activity, campaignId }) => {
  const { user } = useAuth();
  const isRegistered = activity.participants?.some(
    (participant) => participant._id === user?._id
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {activity.name}
          </h3>
          <Badge className={getStatusClass(activity.status)}>
            {activity.status === "upcoming" && "Sắp diễn ra"}
            {activity.status === "ongoing" && "Đang diễn ra"}
            {activity.status === "completed" && "Đã hoàn thành"}
            {activity.status === "cancelled" && "Đã hủy"}
          </Badge>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          <p className="mb-1">
            <span className="font-medium">Thời gian: </span>
            {formatDate(activity.startTime)} - {formatDate(activity.endTime)}
          </p>
          <p className="mb-1">
            <span className="font-medium">Địa điểm: </span>
            {activity.location}
          </p>
          <p className="mb-3">
            <span className="font-medium">Người tổ chức: </span>
            {activity.organizer?.fullName || "N/A"}
          </p>
          <p className="line-clamp-2 text-gray-500">{activity.description}</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">
              {activity.participants?.length || 0}
            </span>{" "}
            người tham gia
          </div>
          <Link
            to={`/campaigns/${campaignId}/activities/${activity._id}`}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
