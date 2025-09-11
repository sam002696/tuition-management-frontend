import { Navigate, Outlet } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";

export default function RedirectIfAuthed() {
  const authed = AuthUser.isAuthenticated();
  const role = authed ? AuthUser.getRole() : null;

  if (!authed) return <Outlet />;

  if (role === "teacher") return <Navigate to="/dashboard" replace />;
  if (role === "student") return <Navigate to="/student-dashboard" replace />;

  // Unknown role → logout → login
  AuthUser.logout?.(() => {});
  return <Navigate to="/login" replace />;
}
