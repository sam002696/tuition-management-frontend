import { lazy } from "react";

const TeacherDashboard = lazy(() =>
  import("../pages/Teacher/Dashboard/Dashboard")
);

const AdminRoutes = [
  {
    path: "/dashboard",

    children: [{ path: "", element: <TeacherDashboard /> }],
  },
];

export default AdminRoutes;
