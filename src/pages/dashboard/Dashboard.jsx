import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCampaignsCount } from "../../api/campaigns";
import { getActivitiesCount } from "../../api/activities";
import { getTasksCount } from "../../api/tasks";
import { getMembersCount } from "../../api/members";
import useAuth from "../../hooks/useAuth";

// UI Components
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    campaigns: 0,
    activities: 0,
    tasks: 0,
    members: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [campaignsData, activitiesData, tasksData, membersData] =
          await Promise.all([
            getCampaignsCount(),
            getActivitiesCount(),
            getTasksCount(),
            getMembersCount(),
          ]);

        setStats({
          campaigns: campaignsData.count,
          activities: activitiesData.count,
          tasks: tasksData.count,
          members: membersData.count,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Chào mừng {user?.fullName || "bạn"} đến với hệ thống quản lý Mùa Hè
            Xanh
          </p>
        </div>
        {user?.role === "admin" && (
          <Link to="/campaigns/create">
            <Button color="primary">Tạo chiến dịch mới</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Chiến dịch
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.campaigns}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/campaigns"
                  className="text-sm font-medium text-blue-500 hover:text-blue-700"
                >
                  Xem tất cả chiến dịch
                </Link>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Hoạt động</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.activities}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/activities"
                  className="text-sm font-medium text-green-500 hover:text-green-700"
                >
                  Xem tất cả hoạt động
                </Link>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Nhiệm vụ</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.tasks}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/tasks"
                  className="text-sm font-medium text-yellow-500 hover:text-yellow-700"
                >
                  Xem tất cả nhiệm vụ
                </Link>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Thành viên
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.members}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/members"
                  className="text-sm font-medium text-purple-500 hover:text-purple-700"
                >
                  Xem tất cả thành viên
                </Link>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Chiến dịch gần đây
              </h2>
              <div className="space-y-4">
                {/* This would be populated with actual data from an API call */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Mùa hè xanh 2025</h3>
                    <p className="text-sm text-gray-500">Vĩnh Long</p>
                  </div>
                  <Badge color="green">Đang diễn ra</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Chiến dịch tình nguyện Xuân</h3>
                    <p className="text-sm text-gray-500">TP.HCM</p>
                  </div>
                  <Badge color="blue">Chuẩn bị</Badge>
                </div>
                <Link
                  to="/campaigns"
                  className="block text-center text-sm font-medium text-blue-500 hover:text-blue-700 mt-4"
                >
                  Xem tất cả chiến dịch
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Nhiệm vụ của tôi
              </h2>
              <div className="space-y-4">
                {/* This would be populated with actual data from an API call */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Chuẩn bị đồ dùng học tập</h3>
                    <p className="text-sm text-gray-500">Hạn: 20/05/2025</p>
                  </div>
                  <Badge color="yellow">Đang thực hiện</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Dọn dẹp khu vực trường học</h3>
                    <p className="text-sm text-gray-500">Hạn: 22/05/2025</p>
                  </div>
                  <Badge color="red">Ưu tiên cao</Badge>
                </div>
                <Link
                  to="/tasks"
                  className="block text-center text-sm font-medium text-blue-500 hover:text-blue-700 mt-4"
                >
                  Xem tất cả nhiệm vụ
                </Link>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
