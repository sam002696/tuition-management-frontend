import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthUser } from "../helpers/AuthUser";

export default function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const authed = AuthUser.isAuthenticated();
    if (!authed) {
      navigate("/login", { replace: true });
      return;
    }
    const role = AuthUser.getRole();
    if (role === "teacher") {
      navigate("/dashboard", { replace: true });
    } else if (role === "student") {
      navigate("/student-dashboard", { replace: true });
    } else {
      // unknown role ⇒ logout & go to login
      AuthUser.logout(() => navigate("/login", { replace: true }));
    }
  }, [navigate]);

  return null; // renders nothing; immediately redirects
}
