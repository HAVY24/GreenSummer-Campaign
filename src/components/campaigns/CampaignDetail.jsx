import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { formatStatus } from "../../utils/formatStatus";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useAuth } from "../../hooks/useAuth";

const CampaignDetail = ({ campaign, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(campaign._id);
      navigate("/campaigns");
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      setIsDeleting(false);
    }
  };

  if (!campaign) return null;

  const {
    _id,
    name,
    description,
    startDate,
    endDate,
    location,
    status,
    createdBy,
    coverImage,
    objectives,
    requirements,
  } = campaign;

  const isAdmin = user && user.role === "admin";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 bg-gray-200 relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
            <span className="text-3xl font-bold">MHX</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <Badge color={formatStatus(status).color} size="lg">
            {formatStatus(status).text}
          </Badge>
        </div>

        {isAdmin && (
          <div className="flex space-x-4 mb-6">
            <Link to={`/campaigns/${_id}/edit`}>
              <Button variant="outline">Edit Campaign</Button>
            </Link>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Campaign
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>Organizer: {createdBy?.fullName || "Unknown"}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Link to={`/campaigns/${_id}/activities`} className="flex-1">
              <Button variant="secondary" fullWidth>
                Activities
              </Button>
            </Link>
            <Link to={`/campaigns/${_id}/tasks`} className="flex-1">
              <Button variant="secondary" fullWidth>
                Tasks
              </Button>
            </Link>
            <Link to={`/campaigns/${_id}/members`} className="flex-1">
              <Button variant="secondary" fullWidth>
                Members
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Objectives
            </h2>
            {objectives && objectives.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No objectives specified</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Requirements
            </h2>
            {requirements && requirements.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No requirements specified</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Campaign"
      >
        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this campaign? This action cannot be
            undone, and all associated activities, tasks, and member assignments
            will be removed.
          </p>
          <div className="flex space-x-4 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Campaign"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetail;
