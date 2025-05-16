import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/ui/Alert";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(userData);
      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
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
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hệ thống quản lý Mùa Hè Xanh
          </p>
        </div>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <RegisterForm onSubmit={handleRegister} loading={loading} />

        <div className="text-sm text-center">
          <p className="mt-2 text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
