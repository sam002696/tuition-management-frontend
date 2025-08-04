import {
  CalendarDaysIcon,
  InformationCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export const getType = (type) => {
  switch (type) {
    case "App\\Notifications\\ConnectionRequestNotification":
      return "Connection request";
    case "App\\Notifications\\TuitionEventNotification":
      return "Tuition event";
    default:
      return "Notification";
  }
};

export const getIconByType = (type) => {
  switch (type) {
    case "App\\Notifications\\ConnectionRequestNotification":
      return (
        <UserPlusIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
      );
    case "App\\Notifications\\TuitionEventNotification":
      return (
        <CalendarDaysIcon
          className="h-6 w-6 text-indigo-500"
          aria-hidden="true"
        />
      );
    default:
      return (
        <InformationCircleIcon
          className="h-6 w-6 text-gray-400"
          aria-hidden="true"
        />
      );
  }
};
