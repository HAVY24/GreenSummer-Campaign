import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "../../hooks/useAuth";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar component */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
