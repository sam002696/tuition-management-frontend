import { lazy } from "react";
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

  {
    path: "/schedule",

    children: [{ path: "", element: <Schedule /> }],
  },
];

export default TeacherRoutes;
