import StudentLayout from "../../../Layout/StudentLayout/StudentLayout";
import TeacherDetailsCard from "../../../components/Student/ConnectTeachers/TeacherDetails/TeacherDetailsCard";

const ConnectStudents = () => {
  return (
    <StudentLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Connection Requests
        </h1>
        <p className="text-gray-600 mb-6">
          Review and respond to tuition requests from teachers
        </p>

        <TeacherDetailsCard />
      </div>
    </StudentLayout>
  );
};

export default ConnectStudents;
