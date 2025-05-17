import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    role: "volunteer", // Default role
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 bg-white text-black ">

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-4 bg-white text-red-500 border border-red-500"
        />
      )}


      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            id="username"
            name="username"
            label="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          type="text"
          id="fullName"
          name="fullName"
          label="Họ và tên"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          type="tel"
          id="phone"
          name="phone"
          label="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="password"
            id="password"
            name="password"
            label="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="volunteer">Tình nguyện viên</option>
            <option value="leader">Đội trưởng</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-black text-black hover:bg-gray-800"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </Button>

      </form>
    </div>
  );
};

export default RegisterForm;
