import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/tasks/TaskForm";
import { getTask, updateTask } from "../../api/tasks";
import { getCampaignMembers } from "../../api/members";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";

const EditTask = () => {
  const { campaignId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        setLoading(true);
        const [taskData, membersData] = await Promise.all([
          getTask(taskId,campaignId),
          getCampaignMembers(campaignId),
        ]);
        setTask(taskData);
        setMembers(membersData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load task data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId, campaignId]);

  const handleSubmit = async (updatedTaskData) => {
    try {
      setSubmitting(true);
      setError(null);
      await updateTask(taskId, campaignId, updatedTaskData);
      setSuccess(true);

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate(`/campaigns/${campaignId}/tasks`);
      }, 1500);
    } catch (err) {
      console.error("Error updating task:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!task && !loading) {
    return (
      <div className="p-4">
        <Alert type="error">
          Task not found or you don't have permission to edit it.
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Task</h1>

      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" className="mb-4">
          Task updated successfully! Redirecting...
        </Alert>
      )}

      <Card className="p-6">
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          members={members}
          loading={submitting}
          isEditing={true}
        />
      </Card>
    </div>
  );
};

export default EditTask;
