import HomeRedirect from "./HomeRedirect";

// Defining routes
const Homeroutes = [
  // { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/",
    element: <HomeRedirect />,
  },
];

export default Homeroutes;
