import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTasks, deleteTask } from "../../api/tasks"; 
import TaskList from "../../components/tasks/TaskList";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import useAuth from "../../hooks/useAuth";
import { roleCheck } from "../../utils/roleCheck";

const Tasks = () => {
  const { campaignId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(campaignId);
        console.log("Tasks data:", data);
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [campaignId]);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này không?")) {
      try {
        await deleteTask(taskId, campaignId);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (err) {
        setError("Không thể xóa nhiệm vụ. Vui lòng thử lại.");
        console.error("Error deleting task:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks Management</h1>
        {roleCheck.hasRequiredRole(user?.role, ["admin", "leader"]) && (
          <Link to={`/campaigns/${campaignId}/tasks/create`}>
            <Button>Create New Task</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <Card className="bg-red-50 border-red-200">
          <p className="text-red-600">{error}</p>
        </Card>
      ) : tasks.length === 0 ? (
        <Card className="bg-gray-50 text-center py-8">
          <p className="text-gray-500 mb-4">
            No tasks available for this campaign.
          </p>
          {roleCheck.hasRequiredRole(user?.role, ["admin", "leader"]) && (
            <Link to={`/campaigns/${campaignId}/tasks/create`}>
              <Button>Create First Task</Button>
            </Link>
          )}
        </Card>
      ) : (
        <TaskList
          tasks={tasks}
          campaignId={campaignId}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Tasks;
