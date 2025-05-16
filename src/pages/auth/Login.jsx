import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/ui/Alert";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hệ thống quản lý Mùa Hè Xanh
          </p>
        </div>

        {error && <Alert type="error" message={error} />}

        <LoginForm onSubmit={handleLogin} loading={loading} />

        <div className="text-sm text-center">
          <p className="mt-2 text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Liên hệ với quản trị viên
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
