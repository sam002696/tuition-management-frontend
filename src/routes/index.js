import AuthRoutes from "./AuthRoutes";
import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";

const AppRoutes = [...AuthRoutes, ...TeacherRoutes, ...StudentRoutes];

export default AppRoutes;
