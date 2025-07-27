import ActiveStudentsList from "../../../components/Teacher/Schedule/ActiveStudentsList/ActiveStudentsList";
import Calender from "../../../components/Teacher/Schedule/Calender/Calender";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";

const Schedule = () => {
  return (
    <TeacherLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Schedule <span className="text-indigo-500">tuition events</span> for
          students
        </h1>

        <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start">
          {/* Active students list */}
          <ActiveStudentsList />

          <div className="flex-1">
            {/* Calender */}

            <Calender />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Schedule;
