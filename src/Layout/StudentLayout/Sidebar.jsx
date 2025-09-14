import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ChartPieIcon,
  UserPlusIcon,
  UserGroupIcon,
  CalendarIcon,
  // EnvelopeIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { AuthUser } from "../../helpers/AuthUser";
import { useDispatch } from "react-redux";

const navigation = [
  { name: "Overview", href: "/student-dashboard", icon: ChartPieIcon },

  {
    name: "Teacher Management",
    href: "/teacher-management",
    icon: UserGroupIcon,
  },
  {
    name: "Connection",
    href: "/connect-with-teachers",
    icon: UserPlusIcon,
  },
  {
    name: "Schedule",
    href: "/student-schedule",
    icon: CalendarIcon,
  },

  // {
  //   name: "Schedule",
  //   icon: CalendarIcon,
  //   children: [
  //     { name: "All events", href: "/dashboard/events" },
  //     { name: "Create event", href: "/dashboard/events/create" },
  //     { name: "Edit event", href: "/dashboard/events/:id/edit" },
  //   ],
  // },
  // {
  //   name: "Messages",
  //   href: "/messages",
  //   icon: EnvelopeIcon,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const user = AuthUser.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  function matchPathPattern(pattern, pathname) {
    if (!pattern || !pathname) return false;
    const regex = new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$");
    return regex.test(pathname);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200 bg-white pb-4">
        <div className="flex h-16 shrink-0 items-center px-6 pt-3">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-12 w-auto"
            alt="Logo"
          />
        </div>
        <nav className="mt-8 flex flex-1 flex-col px-6">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        className={classNames(
                          location.pathname.startsWith(item.href)
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700"
                        )}
                      >
                        {item.icon && (
                          <item.icon
                            className={classNames(
                              location.pathname.startsWith(item.href)
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                            )}
                            aria-hidden="true"
                          />
                        )}

                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure
                        as="div"
                        className="space-y-1"
                        defaultOpen={item.children?.some(
                          (sub) =>
                            sub.href && location.pathname.startsWith(sub.href)
                        )}
                      >
                        {({ open }) => (
                          <>
                            <DisclosureButton
                              className={classNames(
                                location.pathname.startsWith(item.href)
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex w-full items-center gap-x-3 rounded-md py-2 pl-4 pr-2 text-sm font-semibold leading-6"
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className="h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                              <ChevronRightIcon
                                className={classNames(
                                  open
                                    ? "rotate-90 text-gray-500"
                                    : "text-gray-400",
                                  "ml-auto h-5 w-5 shrink-0 transform transition-transform"
                                )}
                                aria-hidden="true"
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="space-y-1">
                              {item.children.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={classNames(
                                    matchPathPattern(
                                      subItem.href,
                                      location.pathname
                                    )
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600",
                                    "block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-700"
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 border-t border-gray-200">
          <div className="group flex w-full items-center justify-between px-6 py-3  mt-2">
            {/* Left: Avatar and Info */}
            <div className="flex items-center gap-x-3">
              <span className="inline-block size-8 overflow-hidden rounded-full bg-gray-100">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="size-full text-gray-300"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {user?.custom_id}
                </p>
              </div>
            </div>

            {/* Right: Sign Out Icon */}
            <button
              type="button"
              className="text-gray-400 hover:text-red-500"
              title="Sign out"
              onClick={() => {
                dispatch({
                  type: "LOGOUT",
                  payload: {
                    navigate,
                  },
                });
              }}
            >
              <ArrowRightEndOnRectangleIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
