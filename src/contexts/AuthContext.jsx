import { createContext, useState, useEffect } from "react";
import { getUserProfile, registerUser, loginUser } from "../api/auth";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check if user is logged in by fetching profile
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error("Auth check failed", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  // Login user
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };
  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      // Kiểm tra response có đúng định dạng không
      if (!response.token || !response.user) {
        throw new Error("Invalid server response");
      }

      const { token, user } = response;
      login(user, token);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Update user data
  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  // === Hàm mới: REGISTER ===
  const register = async (formData) => {
    const { token, user } = await registerUser(formData); // giả sử backend trả về token + user
    login(user, token); // dùng lại logic login luôn
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        loading,
        login: handleLogin,
        logout,
        updateUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
