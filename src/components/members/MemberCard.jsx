import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const MemberCard = ({ member, onEdit, onDelete }) => {
  const { user, role, status, joinedDate, responsibilities } = member;

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge type="success">Hoạt động</Badge>;
      case "inactive":
        return <Badge type="warning">Không hoạt động</Badge>;
      case "suspended":
        return <Badge type="error">Tạm ngưng</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "leader":
        return <Badge type="success">Đội trưởng</Badge>;
      case "member":
        return <Badge type="primary">Thành viên</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{user.fullName}</h3>
          <p className="text-sm text-gray-600">@{user.username}</p>
        </div>
        <div className="flex flex-col gap-2">
          {getRoleBadge(role)}
          {getStatusBadge(status)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Ngày tham gia:</span>{" "}
          {new Date(joinedDate).toLocaleDateString("vi-VN")}
        </p>
      </div>

      {responsibilities && responsibilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Trách nhiệm:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <Button size="sm" variant="outline" onClick={onEdit}>
          Sửa
        </Button>
        <Button size="sm" variant="outline" color="danger" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </Card>
  );
};

export default MemberCard;
