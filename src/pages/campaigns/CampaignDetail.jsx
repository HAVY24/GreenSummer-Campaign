import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCampaignById, deleteCampaign } from "../../api/campaigns";
import { getActivitiesByCampaign } from "../../api/activities";
import { getTasks, deleteTask } from "../../api/tasks";
import { getCampaignMembers } from "../../api/members";
import CampaignDetail from "../../components/campaigns/CampaignDetail";
import ActivityList from "../../components/activities/ActivityList";
import TaskList from "../../components/tasks/TaskList";
import MemberList from "../../components/members/MemberList";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Modal";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const campaignData = await getCampaignById(id);
        setCampaign(campaignData);

        // Fetch related data
        const [activitiesData, tasksData, membersData] = await Promise.all([
          getActivitiesByCampaign(id),
          getTasks(id),
          getCampaignMembers(id),
        ]);

        setActivities(activitiesData);
        setTasks(tasksData);
        setMembers(membersData);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin chiến dịch. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await deleteCampaign(id);
      setShowDeleteModal(false);
      navigate("/campaigns");
    } catch (err) {
      setDeleteError("Không thể xóa chiến dịch. Vui lòng thử lại sau.");
      setDeleteLoading(false);
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
      <Alert
        variant="error"
        message={error || "Không tìm thấy chiến dịch"}
        className="mb-4"
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Link
            to="/campaigns"
            className="text-green-600 hover:text-green-700 mb-2 inline-block"
          >
            &larr; Trở về danh sách chiến dịch
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">{campaign.name}</h1>
        </div>

        {user && user.role === "admin" && (
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link to={`/campaigns/edit/${id}`}>
              <Button variant="secondary">Chỉnh sửa</Button>
            </Link>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Xóa
            </Button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${activeTab === "info"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("info")}
          >
            Thông tin
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "activities"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("activities")}
          >
            Hoạt động ({activities.length})
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "tasks"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("tasks")}
          >
            Nhiệm vụ ({tasks.length})
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "members"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("members")}
          >
            Thành viên ({members.length})
          </button>
        </div>
      </div>

      {activeTab === "info" && (
        <Card className="mb-6">
          <div className="p-6">
            <CampaignDetail campaign={campaign} onDelete={handleDelete} />
          </div>
        </Card>
      )}

      {activeTab === "activities" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Hoạt động của chiến dịch</h2>
            {(user?.role === "admin" || user?.role === "leader") && (
              <Link to={`/campaigns/${id}/activities/create`}>
                <Button variant="primary" size="sm">
                  <span className="mr-2">+</span> Thêm hoạt động
                </Button>
              </Link>
            )}
          </div>

          {activities.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                Chưa có hoạt động nào cho chiến dịch này.
              </p>
            </Card>
          ) : (
            <ActivityList activities={activities} campaignId={id} />
          )}
        </div>
      )}

      {activeTab === "tasks" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nhiệm vụ của chiến dịch</h2>
            {(user?.role === "admin" || user?.role === "leader") && (
              <Link to={`/campaigns/${id}/tasks/create`}>
                <Button variant="primary" size="sm">
                  <span className="mr-2">+</span> Thêm nhiệm vụ
                </Button>
              </Link>
            )}
          </div>

          {tasks.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                Chưa có nhiệm vụ nào cho chiến dịch này.
              </p>
            </Card>
          ) : (
            <TaskList tasks={tasks} campaignId={id} viewMode="card"
              onEdit={(task) => navigate(`/campaigns/${id}/tasks/${task._id}/edit`)}
              onDelete={async (taskId) => {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này không?")) {
              try {
                await deleteTask(taskId, id);
                // Cập nhật danh sách tasks sau khi xóa
                setTasks(tasks.filter(task => task._id !== taskId));
              } catch (err) {
                console.error("Error deleting task:", err);
                alert("Không thể xóa nhiệm vụ. Vui lòng thử lại.");
              }
            }
          }}
            />
            
          )}
        </div>
      )}

      {activeTab === "members" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Thành viên chiến dịch</h2>
            {(user?.role === "admin" || user?.role === "leader") && (
              <Link to={`/campaigns/${id}/members/manage`}>
                <Button variant="primary" size="sm">
                  <span className="mr-2">+</span> Thêm thành viên
                </Button>
              </Link>
            )}
          </div>

          {members.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                Chưa có thành viên nào tham gia chiến dịch này.
              </p>
            </Card>
          ) : (
            <MemberList members={members} campaignId={id} viewMode="card" />
          )}
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Xác nhận xóa"
      >
        <div className="p-6">
          <p className="mb-4">
            Bạn có chắc chắn muốn xóa chiến dịch "{campaign.name}"? Hành động
            này không thể hoàn tác.
          </p>

          {deleteError && (
            <Alert variant="error" message={deleteError} className="mb-4" />
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteLoading}
            >
              Hủy
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={deleteLoading}
            >
              Xóa chiến dịch
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetailPage;
