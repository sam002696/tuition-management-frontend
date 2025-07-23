import AuthRoutes from "./AuthRoutes";
import TeacherRoutes from "./TeacherRoutes";

const AppRoutes = [...AuthRoutes, ...TeacherRoutes];

export default AppRoutes;
