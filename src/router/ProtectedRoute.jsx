import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getDefaultRouteForRole } from "./routes";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return <Outlet />;
}
