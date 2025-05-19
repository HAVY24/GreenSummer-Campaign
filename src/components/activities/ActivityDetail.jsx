import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivityById, registerForActivity } from "../../api/activities";
import { formatDate } from "../../utils/formatDate";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Alert from "../ui/Alert";
import { useAuth } from "../../hooks/useAuth";

const ActivityDetail = () => {
  const { campaignId, activityId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivityById(campaignId, activityId);
        setActivity(data);
      } catch (err) {
        setError(err.message || "Could not fetch activity details");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [campaignId, activityId]);

  const handleRegister = async () => {
    setRegisterLoading(true);
    setRegisterError(null);

    try {
      await registerForActivity(activityId);
      setRegisterSuccess(true);

      // Update the activity data to include the current user in participants
      setActivity((prev) => ({
        ...prev,
        participants: [
          ...prev.participants,
          { _id: user._id, fullName: user.fullName },
        ],
      }));

      setTimeout(() => {
        setRegisterSuccess(false);
      }, 3000);
    } catch (err) {
      setRegisterError(err.message || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  const isRegistered = activity?.participants?.some(
    (participant) => participant._id === user?._id
  );

  const canRegister = user && activity?.status === "upcoming" && !isRegistered;

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Sắp diễn ra</Badge>;
      case "ongoing":
        return (
          <Badge className="bg-green-100 text-green-800">Đang diễn ra</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800">Đã hoàn thành</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} className="mb-4" />;
  }

  if (!activity) {
    return (
      <Alert type="error" message="Không tìm thấy hoạt động" className="mb-4" />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{activity.name}</h1>
          <div className="mt-2">{getStatusBadge(activity.status)}</div>
        </div>

        <div className="flex space-x-2">
          {(user?.role === "admin" ||
            (user?.role === "leader" &&
              activity.organizer?._id === user?._id)) && (
            <Button
              variant="outline"
              onClick={() =>
                navigate(
                  `/campaigns/${campaignId}/activities/${activityId}/edit`
                )
              }
            >
              Chỉnh sửa
            </Button>
          )}

          {canRegister && (
            <Button onClick={handleRegister} disabled={registerLoading}>
              {registerLoading ? "Đang đăng ký..." : "Đăng ký tham gia"}
            </Button>
          )}

          {isRegistered && (
            <Badge className="bg-green-100 text-green-800 flex items-center h-10 px-4">
              Đã đăng ký
            </Badge>
          )}
        </div>
      </div>

      {registerSuccess && (
        <Alert
          type="success"
          message="Đăng ký tham gia thành công!"
          className="mb-4"
        />
      )}

      {registerError && (
        <Alert type="error" message={registerError} className="mb-4" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Thông tin hoạt động</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Người tổ chức: </span>
              {activity.organizer?.fullName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Thời gian: </span>
              {formatDate(activity.startTime)} - {formatDate(activity.endTime)}
            </p>
            <p>
              <span className="font-medium">Địa điểm: </span>
              {activity.location}
            </p>
            <p>
              <span className="font-medium">Số người tham gia: </span>
              {activity.participants?.length || 0}
            </p>
          </div>

          {activity.requirements?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Yêu cầu:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {activity.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Mô tả</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {activity.description}
          </p>

          {activity.notes && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Ghi chú:</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {activity.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold mb-4">Danh sách người tham gia</h2>
        {activity.participants?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activity.participants.map((participant) => (
              <div key={participant._id} className="bg-gray-50 rounded-md p-3">
                {participant.fullName}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có người tham gia</p>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => navigate(`/campaigns/${campaignId}/activities`)}
        >
          Quay lại danh sách hoạt động
        </Button>
      </div>
    </div>
  );
};

export default ActivityDetail;
