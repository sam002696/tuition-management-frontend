import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColor, getInitials } from "../../../../utils/avatarUtils";
import { parseSubjectList } from "../../../../utils/parseSubjects";
import ActiveStudentsSkeleton from "./ActiveStudentsSkeleton";
import Pagination from "../../../common/Pagination";
import Input from "../../../common/Input";

const PER_PAGE = 5;

const ActiveStudentsList = ({ selectedStudent, setSelectedStudent }) => {
  const { activeConnections, loading, pagination } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const didMountRef = useRef(false);

  // Initial load: page 1
  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_CONNECTION_STUDENTS",
      payload: { filters: { per_page: PER_PAGE, page: 1 } },
    });
  }, [dispatch]);

  // Debounced search typing; cancel pending when clearing
  useEffect(() => {
    const search = searchTerm.trim();

    // avoiding firing on very first mount
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (search === "") return;
    }

    if (search) {
      dispatch({
        type: "FETCH_ACTIVE_CONNECTION_STUDENTS_SEARCH", // debounced in saga
        payload: { filters: { per_page: PER_PAGE, page: 1, search: search } },
      });
    } else {
      // cleared and cancel pending debounce and refetch page 1 immediately
      dispatch({ type: "CANCEL_ACTIVE_STUDENTS_SEARCH" });
      dispatch({
        type: "FETCH_ACTIVE_CONNECTION_STUDENTS",
        payload: { filters: { per_page: PER_PAGE, page: 1 } },
      });
    }
  }, [searchTerm, dispatch]);

  const handleShowCalender = (person) => {
    setSelectedStudent(person);
  };

  return loading ? (
    <ActiveStudentsSkeleton activeConnections={activeConnections} />
  ) : (
    <>
      <div className="-mt-3 mb-3 max-w-lg">
        <Input
          name="search"
          placeholder="Search student by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl max-w-lg"
      >
        {(activeConnections || []).map((person) => {
          const name = person?.student?.name ?? person?.name;
          const subjects = parseSubjectList(
            person?.tuition_details?.subject_list
          );
          const displaySubjects = subjects.slice(0, 2).join(", ");
          const remainingCount = Math.max(subjects.length - 2, 0);
          const isSelected = selectedStudent?.id === person.id;

          return (
            <li
              onClick={() => handleShowCalender(person)}
              key={person.id}
              className={`relative flex justify-between gap-x-6 px-4 py-5 cursor-pointer ${
                isSelected ? "bg-gray-100" : "hover:bg-gray-50"
              } sm:px-6`}
            >
              <div className="flex min-w-0 gap-x-4">
                {person?.student?.imageUrl ? (
                  <img
                    alt={name}
                    src={person.student.imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                ) : (
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-full ${generateColor(
                      name
                    )}`}
                  >
                    <span className="font-medium text-white">
                      {getInitials(name)}
                    </span>
                  </span>
                )}

                <div className="min-w-0 flex-auto">
                  <div className="text-sm/6 font-semibold text-gray-900">
                    <div>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {name}
                    </div>
                  </div>
                  <div className="mt-1 flex text-xs/5 text-gray-500">
                    <div className="relative truncate">
                      <span>
                        {displaySubjects}
                        {remainingCount > 0 && `, +${remainingCount}`}
                      </span>
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
          );
        })}

        {(!activeConnections || activeConnections.length === 0) && (
          <li className="px-4 py-6 text-sm text-gray-500">
            No students found.
          </li>
        )}
      </ul>

      {/* Same Pagination API you already use elsewhere */}
      <div className="mt-3 max-w-lg">
        <Pagination
          currentPage={pagination?.current_page}
          perPage={pagination?.per_page}
          hasMorePages={pagination?.has_more_pages}
          total={pagination?.total}
          totalPages={pagination?.total_pages}
          onPageChange={(page) => {
            // Instant fetch for the clicked page
            dispatch({
              type: "FETCH_ACTIVE_CONNECTION_STUDENTS",
              payload: {
                filters: { per_page: PER_PAGE, page },
              },
            });
          }}
        />
      </div>
    </>
  );
};

export default ActiveStudentsList;
