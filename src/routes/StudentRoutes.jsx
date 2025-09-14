import { lazy } from "react";
import RequireRole from "./guards/RequireRole";
import RequireAuth from "./guards/RequireAuth";
const StudentDashboard = lazy(() =>
  import("../pages/Student/Dashboard/Dashboard")
);
const MyTeachers = lazy(() => import("../pages/Student/MyTeachers/MyTeachers"));
const ConnectTeachers = lazy(() =>
  import("../pages/Student/ConnectTeachers/ConnectTeachers")
);
const Schedule = lazy(() => import("../pages/Student/Schedule/Schedule"));

const StudentRoutes = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole role="student" />,
        children: [
          { path: "/student-dashboard", element: <StudentDashboard /> },
          { path: "/teacher-management", element: <MyTeachers /> },
          { path: "/connect-with-teachers", element: <ConnectTeachers /> },
          { path: "/student-schedule", element: <Schedule /> },
        ],
      },
    ],
  },
];

export default StudentRoutes;
