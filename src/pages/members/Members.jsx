import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCampaignMembers, removeCampaignMember} from "../../api/members";
import MemberList from "../../components/members/MemberList";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { roleCheck } from "../../utils/roleCheck";

const Members = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getCampaignMembers(campaignId);
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load members");
        setLoading(false);
      }
    };

    fetchMembers();
  }, [campaignId]);

  const handleEditMember = (member) => {
    // Chuyển hướng đến trang chỉnh sửa thành viên
    navigate(`/campaigns/${campaignId}/members/manage`, {
      state: { editMember: member },
    });
  };

  const handleDeleteMember = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {

        await removeCampaignMember(campaignId, memberId)
        const updatedMembers = members.filter(
          (member) => member._id !== memberId
        );
        setMembers(updatedMembers);
      } catch (err) {
        setError("Failed to delete member");
      }
    }
  };

  if (loading)
    return <div className="flex justify-center p-8">Loading members...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign Members</h1>
        {roleCheck.hasRequiredRole(user?.role, ["admin", "leader"]) && (
          <Link to={`/campaigns/${campaignId}/members/manage`}>
            <Button variant="primary">Manage Members</Button>
          </Link>
        )}
      </div>

      {members.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No members found for this campaign</p>
        </div>
      ) : (
        <MemberList
          members={members}
          viewMode="card"
          onEdit={
            roleCheck.hasRequiredRole(user?.role, ["admin", "leader"])
              ? handleEditMember
              : undefined
          }
          onDelete={
            roleCheck.hasRequiredRole(user?.role, ["admin", "leader"])
              ? handleDeleteMember
              : undefined
          }
        />
      )}
    </div>
  );
};

export default Members;
