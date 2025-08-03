import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { AuthUser } from "../../helpers/AuthUser";

const NotificationsButton = () => {
  const user = AuthUser.getUser();
  const dispatch = useDispatch();

  const { items: notifications } = useSelector((state) => state?.notifications);

  useEffect(() => {
    dispatch({ type: "FETCH_NOTIFICATIONS", payload: { id: user?.id } });
  }, [dispatch, user?.id]);

  // console.log("notifications", notifications);

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none">
            Notifications
            <span className="text-red-600">({notifications.length})</span>
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-2 space-y-2 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-sm text-gray-500 px-4 py-2">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification?.id}
                  className="flex w-full items-start rounded-lg bg-white p-4 shadow ring-1 ring-black/5"
                >
                  <div className="shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-900">
                      {notification?.data?.body}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {notification?.created_at}
                    </p>
                  </div>
                  {/* Optional close button */}
                  {/* <div className="ml-4 flex-shrink-0">
      <button
        onClick={() => removeNotification(notification.id)}
        className="text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div> */}
                </div>
              ))
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default NotificationsButton;
