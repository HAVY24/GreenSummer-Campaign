import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/tasks/TaskForm";
import { createTask } from "../../api/tasks";
import { getCampaignMembers } from "../../api/members";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";

const CreateTask = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getCampaignMembers(campaignId);
        setMembers(data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Some features may be limited.");
      }
    };

    fetchMembers();
  }, [campaignId]);

  const handleSubmit = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      await createTask(campaignId, taskData);
      setSuccess(true);

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate(`/campaigns/${campaignId}/tasks`);
      }, 1500);
    } catch (err) {
      console.error("Error creating task:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h1>

      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" className="mb-4">
          Task created successfully! Redirecting...
        </Alert>
      )}

      <Card className="p-6">
        <TaskForm onSubmit={handleSubmit} members={members} loading={loading} />
      </Card>
    </div>
  );
};

export default CreateTask;
