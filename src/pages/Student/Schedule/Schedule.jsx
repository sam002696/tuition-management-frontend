import { useEffect, useState } from "react";
import ActiveTeachersList from "../../../components/Student/Schedule/ActiveTeachersList/ActiveTeachersList";
import Calender from "../../../components/Student/Schedule/Calender/Calender";
import { useSelector } from "react-redux";
import TuitionEventList from "../../../components/Student/Schedule/TuitionEventList/TuitionEventList";
import StudentLayout from "../../../Layout/StudentLayout/StudentLayout";

const Schedule = () => {
  const { activeConnections } = useSelector(
    (state) => state.scheduleTuitionEventsTeacher
  );
  const [eventList, setEventList] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  console.log("activeConnections", activeConnections);

  // Automatically select the first student when list updates
  useEffect(() => {
    if (activeConnections?.length > 0 && !selectedTeacher) {
      setSelectedTeacher(activeConnections[0]);
    }
  }, [activeConnections, selectedTeacher]);

  // console.log("eventList", eventList);
  return (
    <StudentLayout>
      <div className="pt-3">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Schedule <span className="text-indigo-500">tuition events</span> for
          teachers
        </h1>

        <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start">
          {/* Active students list */}
          <div className="flex flex-col">
            <ActiveTeachersList
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
            />

            <TuitionEventList eventList={eventList} />
          </div>

          <div className="flex-1">
            {/* Calender */}

            <Calender
              selectedTeacher={selectedTeacher}
              setEventList={setEventList}
            />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Schedule;
