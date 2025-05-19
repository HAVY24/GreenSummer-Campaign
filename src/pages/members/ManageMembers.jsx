import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCampaignMembers,
  addCampaignMember,
  updateCampaignMember,
  removeCampaignMember,
} from "../../api/members";
import MemberForm from "../../components/members/MemberForm";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Alert from "../../components/ui/Alert";
import Badge from "../../components/ui/Badge";

const ManageMembers = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [campaignId]);

  const fetchMembers = async () => {
    try {
      const data = await getCampaignMembers(campaignId);
      console.log(data);
      setMembers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load members");
      setLoading(false);
    }
  };

  const handleAddMember = async (memberData) => {
    setSubmitting(true);
    setFormError(null);
    try {
      await addCampaignMember(campaignId, memberData);
      await fetchMembers();
      setShowAddModal(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to add member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateMember = async (memberData) => {
    setSubmitting(true);
    setFormError(null);
    try {
      await updateCampaignMember(campaignId, selectedMember._id, memberData);
      await fetchMembers();
      setShowEditModal(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to update member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async () => {
    setSubmitting(true);
    try {
      await removeCampaignMember(campaignId, selectedMember._id);
      await fetchMembers();
      setShowDeleteModal(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to remove member");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "user.fullName" },
    { header: "Username", accessor: "user.username" },
    {
      header: "Role",
      accessor: "role",
      cell: (row) => (
        <Badge color={row.role === "leader" ? "green" : "blue"}>
          {row.role}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => {
        const statusColors = {
          active: "green",
          inactive: "gray",
          suspended: "red",
        };
        return <Badge color={statusColors[row.status]}>{row.status}</Badge>;
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedMember(row);
              setShowEditModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setSelectedMember(row);
              setShowDeleteModal(true);
            }}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  if (loading)
    return <div className="flex justify-center p-8">Loading members...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Link
        to={`/campaigns/${campaignId}/members`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Members
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Campaign Members</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New Member
        </Button>
      </div>

      <Card>
        {members.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No members found for this campaign</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => setShowAddModal(true)}
            >
              Add Your First Member
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            data={members}
            emptyMessage="No members found"
          />
        )}
      </Card>

      {/* Add Member Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Member"
      >
        {formError && (
          <Alert type="error" className="mb-4">
            {formError}
          </Alert>
        )}
        <MemberForm
          onSubmit={handleAddMember}
          isSubmitting={submitting}
          campaignId={campaignId}
        />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Member"
      >
        {formError && (
          <Alert type="error" className="mb-4">
            {formError}
          </Alert>
        )}
        {selectedMember && (
          <MemberForm
            onSubmit={handleUpdateMember}
            isSubmitting={submitting}
            initialData={selectedMember}
            isEditing={true}
            campaignId={campaignId}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Remove Member"
      >
        {formError && (
          <Alert type="error" className="mb-4">
            {formError}
          </Alert>
        )}
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to remove {selectedMember?.user?.fullName}{" "}
            from this campaign?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteMember}
              loading={submitting}
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageMembers;
