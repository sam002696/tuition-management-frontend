import Error401 from "../pages/errors/Error401";
import Error403 from "../pages/errors/Error403";
import NotFound from "../pages/errors/NotFound";

const SystemRoutes = [
  { path: "/401", element: <Error401 /> },
  { path: "/403", element: <Error403 /> },
  { path: "*", element: <NotFound /> },
];

export default SystemRoutes;
