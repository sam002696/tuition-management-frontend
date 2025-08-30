import { lazy } from "react";
// import { Navigate, Route } from "react-router";
// import PublicOnlyRoute from "./PublicOnlyRoute";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const ResetPassword = lazy(() =>
  import("../pages/Auth/ResetPassword/ResetPassword")
);

// Defining routes
const Authroutes = [
  // { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  // {
  //   path: "/register",
  //   element: (
  //     <PublicOnlyRoute>
  //       <Register />
  //     </PublicOnlyRoute>
  //   ),
  // },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
];

export default Authroutes;
