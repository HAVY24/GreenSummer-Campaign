// src/components/forms/MemberForm.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import Select from "../ui/Select";
import { getAllUsers } from "../../api/auth";

const MemberForm = ({
  onSubmit,
  initialData = null,
  users: usersProp = [],
  loading = false,
  error = null,
}) => {
  const [users, setUsers] = useState(usersProp);
  const [userLoading, setUserLoading] = useState(!usersProp.length);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      role: "member",
      responsibilities: "",
      status: "active",
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    if (!usersProp.length) fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setValue("userId", initialData.user._id);
      setValue("role", initialData.role);
      setValue(
        "responsibilities",
        initialData.responsibilities?.join(", ") || ""
      );
      setValue("status", initialData.status);
    }
  }, [initialData, setValue]);

  const processFormData = (data) => {
    const responsibilities = data.responsibilities
      ? data.responsibilities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      : [];

    return {
      ...data,
      responsibilities,
    };
  };

  const handleFormSubmit = (data) => {
    const processedData = processFormData(data);
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <div>
        <Select
          label="Thành viên"
          {...register("userId", { required: "Vui lòng chọn thành viên" })}
          error={errors.userId?.message}
          disabled={loading || !!initialData || userLoading}
        >
          <option value="">-- Chọn thành viên --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName} ({user.username})
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Vai trò"
          {...register("role", { required: "Vui lòng chọn vai trò" })}
          error={errors.role?.message}
          disabled={loading}
        >
          <option value="member">Thành viên</option>
          <option value="leader">Đội trưởng</option>
        </Select>
      </div>

      <div>
        <Input
          label="Trách nhiệm (phân cách bằng dấu phẩy)"
          {...register("responsibilities")}
          placeholder="Tổ chức sự kiện, Liên hệ đối tác..."
          disabled={loading}
        />
      </div>

      {initialData && (
        <div>
          <Select label="Trạng thái" {...register("status")} disabled={loading}>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="suspended">Tạm ngưng</option>
          </Select>
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
            : "Thêm thành viên"}
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;
