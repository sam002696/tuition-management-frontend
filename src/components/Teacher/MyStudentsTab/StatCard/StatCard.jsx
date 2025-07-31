import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  // CursorArrowRaysIcon,
  // EnvelopeOpenIcon,
  // UsersIcon,
  UserGroupIcon,
  ClockIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const StatCard = () => {
  const { connectionCount } = useSelector((state) => state.studentManagement);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "CONNECTION_COUNT",
    });
  }, [dispatch]);

  const getStats = (connectionCount) => [
    {
      id: 1,
      name: "Active Students",
      stat: connectionCount?.active_accepted,
      icon: UserGroupIcon,
      change: "122",
      changeType: "increase",
      bgColor: "bg-green-500",
      textColor: "text-green-700",
    },
    {
      id: 2,
      name: "Pending Students",
      stat: connectionCount?.pending,
      icon: ClockIcon,
      change: "5.4%",
      changeType: "increase",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-700",
    },
    {
      id: 3,
      name: "Archived Students",
      stat: connectionCount?.inactive_accepted,
      icon: ArchiveBoxIcon,
      change: "3.2%",
      changeType: "decrease",
      bgColor: "bg-gray-500",
      textColor: "text-gray-700",
    },
  ];

  const StatCard = () => {
    const { connectionCount } = useSelector((state) => state.studentManagement);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: "CONNECTION_COUNT",
      });
    }, [dispatch]);

    const stats = getStats(connectionCount);
  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
          >
            <dt>
              <div className={`absolute rounded-lg ${item.bgColor} p-3`}>
                <item.icon
                  aria-hidden="true"
                  className={`size-6 font-semibold ${item.textColor}`}
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat !== undefined ? item.stat : "-"}
              </p>
              {/* <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 self-center text-green-500"
                  />
                ) : (
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 self-center text-red-500"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </p> */}
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
export default StatCard;
