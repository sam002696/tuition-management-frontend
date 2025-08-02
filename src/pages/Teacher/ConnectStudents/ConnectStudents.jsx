import { useSelector } from "react-redux";
import StudentSearchBar from "../../../components/Teacher/ConnectStudents/SearchBar/StudentSearchBar";
import StudentDetailsCard from "../../../components/Teacher/ConnectStudents/StudentDetails/StudentDetailsCard";
import TuitionDetails from "../../../components/Teacher/ConnectStudents/TuitionDetails/TuitionDetails";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import StudentDetailsCardSkeleton from "../../../components/Teacher/ConnectStudents/StudentDetails/StudentDetailsCardSkeleton";
import TuitionDetailsSkeleton from "../../../components/Teacher/ConnectStudents/TuitionDetails/TuitionDetailsSkeleton";

const ConnectStudents = () => {
  const { studentDetails, loading } = useSelector(
    (state) => state.connectStudents
  );

  return (
    <TeacherLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Connect with Students
        </h1>
        <p className="text-gray-600 mb-6">
          Search for students by their ID and send connection requests
        </p>

        <StudentSearchBar />

        <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start">
          {/* Student Card  */}
          {loading ? (
            <>
              <StudentDetailsCardSkeleton />
              <div className="flex-1">
                <TuitionDetailsSkeleton />
              </div>
            </>
          ) : studentDetails !== null ? (
            <>
              <StudentDetailsCard studentDetails={studentDetails} />
              <div className="flex-1">
                <TuitionDetails studentDetails={studentDetails} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default ConnectStudents;
