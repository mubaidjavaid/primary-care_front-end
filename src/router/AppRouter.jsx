import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAuthStore } from "../store/authStore";
import ProtectedRoute from "./ProtectedRoute";
import {
    allowedAdminOnly,
    allowedClinical,
    APP_ROLES,
    getDefaultRouteForRole,
} from "./routes";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const TriageChat = lazy(() => import("../pages/triage/TriageChat"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const SuperAdminDashboard = lazy(
  () => import("../pages/superadmin/SuperAdminDashboard"),
);
const NotFound = lazy(() => import("../pages/NotFound"));

function RootRedirect() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
}

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route element={<ProtectedRoute allowedRoles={allowedClinical} />}>
          <Route path="/triage" element={<TriageChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={allowedAdminOnly} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={[APP_ROLES.SUPERADMIN]} />}
        >
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
