import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColor, getInitials } from "../../../../utils/avatarUtils";

// const people = [
//   {
//     name: "Leslie Alexander",
//     email: "leslie.alexander@example.com",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Michael Foster",
//     email: "michael.foster@example.com",
//     role: "Co-Founder / CTO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Dries Vincent",
//     email: "dries.vincent@example.com",
//     role: "Business Relations",
//     imageUrl:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: null,
//   },
//   {
//     name: "Lindsay Walton",
//     email: "lindsay.walton@example.com",
//     role: "Front-end Developer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Courtney Henry",
//     email: "courtney.henry@example.com",
//     role: "Designer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Tom Cook",
//     email: "tom.cook@example.com",
//     role: "Director of Product",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     href: "#",
//     lastSeen: null,
//   },
// ];

const ActiveStudentsList = () => {
  const { activeConnections } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVE_CONNECTION_STUDENTS" });
  }, [dispatch]);

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl max-w-lg"
    >
      {activeConnections.map((person) => (
        <li
          key={person.id}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
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
              <p className="text-sm/6 font-semibold text-gray-900">
                <a href="">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person?.student?.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs/5 text-gray-500">
                <div className="relative truncate">
                  {(() => {
                    const subjectsRaw = person?.tuition_details?.subject_list;
                    let subjects = [];

                    try {
                      subjects = JSON.parse(subjectsRaw); // safely parse string
                    } catch (err) {
                      console.error("Invalid subject_list format:", err);
                    }

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
              </p>
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
