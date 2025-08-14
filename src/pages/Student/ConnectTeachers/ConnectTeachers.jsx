import { useSelector } from "react-redux";
import StudentSearchBar from "../../../components/Teacher/ConnectStudents/SearchBar/StudentSearchBar";
import StudentDetailsCard from "../../../components/Teacher/ConnectStudents/StudentDetails/StudentDetailsCard";
import TuitionDetails from "../../../components/Teacher/ConnectStudents/TuitionDetails/TuitionDetails";
import StudentLayout from "../../../Layout/StudentLayout/StudentLayout";
import TeacherDetailsCard from "../../../components/Student/ConnectTeachers/TeacherDetails/TeacherDetailsCard";

const ConnectStudents = () => {
  const { studentDetails } = useSelector((state) => state.connectStudents);

  return (
    <StudentLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Connect with Teachers
        </h1>
        <p className="text-gray-600 mb-6">
          Accept connection requests sent by the teachers viewing details
        </p>

        {/* <StudentSearchBar /> */}
        <TeacherDetailsCard />

        <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start">
          {/* Student Card  */}
          {studentDetails && (
            <>
              <StudentDetailsCard studentDetails={studentDetails} />
              <div className="flex-1">
                <TuitionDetails studentDetails={studentDetails} />
              </div>
            </>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default ConnectStudents;
