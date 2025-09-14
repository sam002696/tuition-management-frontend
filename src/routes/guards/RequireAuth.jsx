import { Navigate, Outlet, useLocation } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";

export default function RequireAuth() {
  const authed = AuthUser.isAuthenticated();
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/401" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
