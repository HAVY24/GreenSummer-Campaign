import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createActivity } from "../../api/activities";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

const ActivityForm = ({
  editMode = false,
  initialData = {},
  onSubmit,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    startTime: initialData.startTime
      ? new Date(initialData.startTime).toISOString().slice(0, 16)
      : "",
    endTime: initialData.endTime
      ? new Date(initialData.endTime).toISOString().slice(0, 16)
      : "",
    location: initialData.location || "",
    requirements: initialData.requirements?.join(", ") || "",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requirementsArray = formData.requirements
        ? formData.requirements
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [];

      const activityData = {
        ...formData,
        requirements: requirementsArray,
      };

      if (onSubmit) {
        await onSubmit(activityData); // <-- Gọi hàm từ EditActivity
      } else {
        await createActivity(campaignId, activityData); // Mặc định dùng khi tạo mới
        navigate(`/campaigns/${campaignId}/activities`);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      {error && <Alert type="error" message={error} className="mb-4" />}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Tên hoạt động *
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nhập tên hoạt động"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Mô tả *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Mô tả chi tiết về hoạt động"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Thời gian bắt đầu *
          </label>
          <Input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            Thời gian kết thúc *
          </label>
          <Input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="location"
        >
          Địa điểm *
        </label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Nhập địa điểm tổ chức"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="requirements"
        >
          Yêu cầu
        </label>
        <Input
          type="text"
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Các yêu cầu, cách nhau bởi dấu phẩy"
        />
        <p className="text-xs text-gray-500 mt-1">
          Các yêu cầu phân cách bằng dấu phẩy
        </p>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="notes"
        >
          Ghi chú
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Các ghi chú bổ sung"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="3"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="mr-2"
          onClick={() => navigate(`/campaigns/${campaignId}/activities`)}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={loading || isSubmitting}>
          {loading || isSubmitting
            ? "Đang xử lý..."
            : editMode
            ? "Cập nhật"
            : "Tạo hoạt động"}
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
