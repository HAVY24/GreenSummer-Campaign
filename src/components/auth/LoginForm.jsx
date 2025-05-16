import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        Đăng nhập
      </h2>

      {error && <Alert type="error" message={error} className="mb-4" />}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            id="username"
            name="username"
            label="Tên đăng nhập"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            id="password"
            name="password"
            label="Mật khẩu"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
