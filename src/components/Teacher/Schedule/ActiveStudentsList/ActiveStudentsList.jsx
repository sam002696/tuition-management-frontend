import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColor, getInitials } from "../../../../utils/avatarUtils";
import { parseSubjectList } from "../../../../utils/parseSubjects";
import ActiveStudentsSkeleton from "./ActiveStudentsSkeleton";

const ActiveStudentsList = ({ selectedStudent, setSelectedStudent }) => {
  const { activeConnections, loading } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVE_CONNECTION_STUDENTS" });
  }, [dispatch]);

  const handleShowCalender = (person) => {
    setSelectedStudent(person);
  };

  return loading ? (
    <ActiveStudentsSkeleton activeConnections={activeConnections} />
  ) : (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl max-w-lg"
    >
      {activeConnections.map((person) => (
        <li
          onClick={() => handleShowCalender(person)}
          key={person.id}
          className={`relative flex justify-between gap-x-6 px-4 py-5 cursor-pointer ${
            selectedStudent?.id === person.id
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          } sm:px-6`}
        >
          <div className="flex min-w-0 gap-x-4">
            {person?.student?.imageUrl ? (
              <img
                alt={person.student.name}
                src={person.student.imageUrl}
                className="size-12 flex-none rounded-full bg-gray-50"
              />
            ) : (
              <span
                className={`inline-flex size-12 items-center justify-center rounded-full ${generateColor(
                  person.student.name
                )}`}
              >
                <span className="font-medium text-white">
                  {getInitials(person.student.name)}
                </span>
              </span>
            )}

            <div className="min-w-0 flex-auto">
              <div className="text-sm/6 font-semibold text-gray-900">
                <div>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person?.student?.name}
                </div>
              </div>
              <div className="mt-1 flex text-xs/5 text-gray-500">
                <div className="relative truncate">
                  {(() => {
                    const subjects = parseSubjectList(
                      person?.tuition_details?.subject_list
                    );
                    const displaySubjects = subjects.slice(0, 2).join(", ");
                    const remainingCount = subjects.length - 2;

                    return (
                      <span>
                        {displaySubjects}
                        {remainingCount > 0 && `, +${remainingCount}`}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">
                {person?.tuition_details?.class_level}
              </p>

              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs/5 text-gray-500">
                  {person?.student?.phone}
                </p>
              </div>
            </div>
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 flex-none text-gray-400"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ActiveStudentsList;
