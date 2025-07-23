import { lazy } from "react";

const TeacherDashboard = lazy(() =>
  import("../pages/Teacher/Dashboard/Dashboard")
);

const MyStudents = lazy(() => import("../pages/Teacher/MyStudents/MyStudents"));

const AdminRoutes = [
  {
    path: "/dashboard",

    children: [{ path: "", element: <TeacherDashboard /> }],
  },

  {
    path: "/my-students",

    children: [{ path: "", element: <MyStudents /> }],
  },
];

export default AdminRoutes;
