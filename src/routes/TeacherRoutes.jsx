import { lazy } from "react";
import RequireRole from "./guards/RequireRole";
import RequireAuth from "./guards/RequireAuth";
const TeacherDashboard = lazy(() =>
  import("../pages/Teacher/Dashboard/Dashboard")
);
const MyStudents = lazy(() => import("../pages/Teacher/MyStudents/MyStudents"));
const ConnectStudents = lazy(() =>
  import("../pages/Teacher/ConnectStudents/ConnectStudents")
);
const Schedule = lazy(() => import("../pages/Teacher/Schedule/Schedule"));

const TeacherRoutes = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole role="teacher" />,
        children: [
          { path: "/dashboard", element: <TeacherDashboard /> },
          { path: "/student-management", element: <MyStudents /> },
          { path: "/connect-students", element: <ConnectStudents /> },
          { path: "/schedule", element: <Schedule /> },
        ],
      },
    ],
  },
];

export default TeacherRoutes;
