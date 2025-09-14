import { Navigate, Outlet } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";

export default function RequireRole({ role }) {
  const authed = AuthUser.isAuthenticated();
  const currentRole = AuthUser.getRole();

  if (!authed) return <Navigate to="/401" replace />;
  if (currentRole !== role) {
    // pass role to 403 for “Go to your dashboard” button
    return <Navigate to="/403" replace state={{ role: currentRole }} />;
  }
  return <Outlet />;
}
