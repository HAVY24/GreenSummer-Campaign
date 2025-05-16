import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

const TaskForm = ({
  onSubmit,
  initialData = null,
  members = [],
  loading = false,
  error = null,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "medium",
      status: "pending",
      completionNotes: "",
    },
  });

  const status = watch("status");

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("assignedTo", initialData.assignedTo?._id);
      setValue(
        "dueDate",
        new Date(initialData.dueDate).toISOString().split("T")[0]
      );
      setValue("priority", initialData.priority);
      setValue("status", initialData.status);
      setValue("completionNotes", initialData.completionNotes || "");
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <div>
        <Input
          label="Tiêu đề nhiệm vụ"
          {...register("title", { required: "Vui lòng nhập tiêu đề nhiệm vụ" })}
          error={errors.title?.message}
          disabled={loading}
        />
      </div>

      <div>
        <TextArea
          label="Mô tả nhiệm vụ"
          {...register("description", {
            required: "Vui lòng nhập mô tả nhiệm vụ",
          })}
          error={errors.description?.message}
          disabled={loading}
          rows={4}
        />
      </div>

      <div>
        <Select
          label="Người thực hiện"
          {...register("assignedTo", {
            required: "Vui lòng chọn người thực hiện",
          })}
          error={errors.assignedTo?.message}
          disabled={loading}
        >
          <option value="">-- Chọn người thực hiện --</option>
          {members.map((member) => (
            <option key={member.user._id} value={member.user._id}>
              {member.user.fullName} (
              {member.role === "leader" ? "Đội trưởng" : "Thành viên"})
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Hạn chót"
            type="date"
            {...register("dueDate", { required: "Vui lòng chọn hạn chót" })}
            error={errors.dueDate?.message}
            disabled={loading}
          />
        </div>

        <div>
          <Select
            label="Độ ưu tiên"
            {...register("priority")}
            disabled={loading}
          >
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </Select>
        </div>
      </div>

      {initialData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              label="Trạng thái"
              {...register("status")}
              disabled={loading}
            >
              <option value="pending">Chờ xử lý</option>
              <option value="in_progress">Đang thực hiện</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </Select>
          </div>
        </div>
      )}

      {initialData && (status === "completed" || status === "cancelled") && (
        <div>
          <TextArea
            label="Ghi chú hoàn thành"
            {...register("completionNotes")}
            disabled={loading}
            rows={3}
            placeholder="Nhập ghi chú hoàn thành hoặc lý do hủy..."
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={loading}
        >
          Làm mới
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Đang xử lý..."
            : initialData
            ? "Cập nhật"
            : "Tạo nhiệm vụ"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
