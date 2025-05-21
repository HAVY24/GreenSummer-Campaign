import React, { useState } from "react";
import MemberCard from "./MemberCard";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const MemberList = ({
  members,
  onEdit = () => {},
  onDelete = () => {},
  viewMode = "table",
}) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const columns = [
    { header: "Họ và tên", accessor: "user.fullName" },
    {
      header: "Vai trò",
      accessor: "role",
      cell: ({ value }) => (
        <Badge type={value === "leader" ? "success" : "primary"}>
          {value === "leader" ? "Đội trưởng" : "Thành viên"}
        </Badge>
      ),
    },
    {
      header: "Trạng thái",
      accessor: "status",
      cell: ({ value }) => {
        let type = "default";
        let label = "Không xác định";

        switch (value) {
          case "active":
            type = "success";
            label = "Hoạt động";
            break;
          case "inactive":
            type = "warning";
            label = "Không hoạt động";
            break;
          case "suspended":
            type = "error";
            label = "Tạm ngưng";
            break;
        }

        return <Badge type={type}>{label}</Badge>;
      },
    },
    {
      header: "Ngày tham gia",
      accessor: "joinedDate",
      cell: ({ value }) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      header: "Thao tác",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(row.original)}
          >
            Sửa
          </Button>
          <Button
            size="sm"
            variant="outline"
            color="danger"
            onClick={() => onDelete(row.original._id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  if (members.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          Chưa có thành viên nào trong chiến dịch này
        </p>
      </div>
    );
  }

  return (
    <div>
      {viewMode === "table" ? (
        <Table columns={columns} data={members} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberCard
              key={member._id}
              member={member}
              onEdit={() => onEdit(member)}
              onDelete={() => onDelete(member._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
