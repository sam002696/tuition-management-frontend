import { useEffect, useState } from "react";
import ActiveStudentsList from "../../../components/Teacher/Schedule/ActiveStudentsList/ActiveStudentsList";
import Calender from "../../../components/Teacher/Schedule/Calender/Calender";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import { useSelector } from "react-redux";
import TuitionEventList from "../../../components/Teacher/Schedule/TuitionEventList/TuitionEventList";

const Schedule = () => {
  const { activeConnections } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const [eventList, setEventList] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Automatically select the first student when list updates
  useEffect(() => {
    if (activeConnections?.length > 0 && !selectedStudent) {
      setSelectedStudent(activeConnections[0]);
    }
  }, [activeConnections, selectedStudent]);

  console.log("eventList", eventList);
  return (
    <TeacherLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Schedule <span className="text-indigo-500">tuition events</span> for
          students
        </h1>

        <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start">
          {/* Active students list */}
          <div className="flex flex-col">
            <ActiveStudentsList
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />

            <TuitionEventList eventList={eventList} />
          </div>

          <div className="flex-1">
            {/* Calender */}

            <Calender
              selectedStudent={selectedStudent}
              setEventList={setEventList}
            />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Schedule;
