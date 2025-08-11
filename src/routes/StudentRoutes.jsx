import { lazy } from "react";
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
    path: "/student-dashboard",

    children: [{ path: "", element: <StudentDashboard /> }],
  },

  {
    path: "/teacher-management",

    children: [{ path: "", element: <MyTeachers /> }],
  },

  {
    path: "/connect-with-teachers",

    children: [{ path: "", element: <ConnectTeachers /> }],
  },

  {
    path: "/student-schedule",

    children: [{ path: "", element: <Schedule /> }],
  },
];

export default StudentRoutes;
