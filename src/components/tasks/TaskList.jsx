import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Table from "../ui/Table";
import Button from "../ui/Button";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  viewMode = "table",
}) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge type="error">Cao</Badge>;
      case "medium":
        return <Badge type="warning">Trung bình</Badge>;
      case "low":
        return <Badge type="success">Thấp</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge type="default">Chờ xử lý</Badge>;
      case "in_progress":
        return <Badge type="primary">Đang thực hiện</Badge>;
      case "completed":
        return <Badge type="success">Hoàn thành</Badge>;
      case "cancelled":
        return <Badge type="error">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const columns = [
    { header: "Tiêu đề", accessor: "title" },
    {
      header: "Người thực hiện",
      accessor: "assignedTo",
      cell: ({ value }) => (value ? value.fullName : "Chưa phân công"),
    },
    {
      header: "Độ ưu tiên",
      accessor: "priority",
      cell: ({ value }) => getPriorityBadge(value),
    },
    {
      header: "Trạng thái",
      accessor: "status",
      cell: ({ value }) => getStatusBadge(value),
    },
    {
      header: "Hạn chót",
      accessor: "dueDate",
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
            Chi tiết
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

  console.log("TaskList tasks:", tasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          Chưa có nhiệm vụ nào trong chiến dịch này
        </p>
      </div>
    );
  }

  return (
    <div>
      {viewMode === "table" ? (
        <Table columns={columns} data={tasks} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task._id)}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
