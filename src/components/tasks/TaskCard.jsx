import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Select from "../ui/Select";

const TaskCard = ({ task, onEdit = () => { }, onDelete = () => { }, onStatusChange }) => {
  
  const {
    _id,
    title,
    description,
    assignedTo,
    dueDate,
    status,
    priority,
    assignedBy,
  } = task;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge color="red">Cao</Badge>;
      case "medium":
        return <Badge color="yellow">Trung bình</Badge>;
      case "low":
        return <Badge color="green">Thấp</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge color="gray">Chờ xử lý</Badge>;
      case "in_progress":
        return <Badge color="blue">Đang thực hiện</Badge>;
      case "completed":
        return <Badge color="green">Hoàn thành</Badge>;
      case "cancelled":
        return <Badge color="red">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const handleStatusChange = (e) => {
    if (onStatusChange) {
      onStatusChange(_id, e.target.value);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          {getPriorityBadge(priority)}
          {getStatusBadge(status)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Người thực hiện:</span>
          <span className="font-medium">
            {assignedTo ? assignedTo.fullName : "Chưa phân công"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Người giao:</span>
          <span className="font-medium">
            {assignedBy ? assignedBy.fullName : "Không xác định"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Hạn chót:</span>
          <span className="font-medium">
            {new Date(dueDate).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>

      {onStatusChange && (
        <div className="mb-4">
          <Select
            className="w-full"
            value={status}
            onChange={handleStatusChange}
            size="sm"
          >
            <option value="pending">Chờ xử lý</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </Select>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-2">
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

export default TaskCard;
