import StudentSearchBar from "../../../components/Teacher/ConnectStudents/SearchBar/StudentSearchBar";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";

const ConnectStudents = () => {
  const handleSearch = (studentId) => {
    console.log("Search initiated for:", studentId);
    // You can trigger a saga dispatch or API call here
  };

  return (
    <TeacherLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Connect with Students
        </h1>
        <p className="text-gray-600 mb-6">
          Search for students by their ID and send connection requests
        </p>

        <StudentSearchBar onSearch={handleSearch} />
      </div>
    </TeacherLayout>
  );
};

export default ConnectStudents;
