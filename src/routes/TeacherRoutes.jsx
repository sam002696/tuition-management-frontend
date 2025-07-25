import { lazy } from "react";
const TeacherDashboard = lazy(() =>
  import("../pages/Teacher/Dashboard/Dashboard")
);

const MyStudents = lazy(() => import("../pages/Teacher/MyStudents/MyStudents"));
const ConnectStudents = lazy(() =>
  import("../pages/Teacher/ConnectStudents/ConnectStudents")
);

const AdminRoutes = [
  {
    path: "/dashboard",

    children: [{ path: "", element: <TeacherDashboard /> }],
  },

  {
    path: "/student-management",

    children: [{ path: "", element: <MyStudents /> }],
  },

  {
    path: "/connect-students",

    children: [{ path: "", element: <ConnectStudents /> }],
  },
];

export default AdminRoutes;
