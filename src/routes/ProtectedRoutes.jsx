import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/NavContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  // ⏳ Wait until auth check finishes
  if (loading) {
    return <div style={{ paddingTop: "80px" }}>Checking authentication...</div>;
  }

  // ❌ Not logged in → redirect
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;