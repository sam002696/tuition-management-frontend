import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ModalWrapper from "../../../common/ModalWrapper";
import EventDetailsCard from "../Calender/EventDetailsCard";

const statuses = {
  accepted: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  rejected: "text-red-800 bg-red-50 ring-red-600/20",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TuitionEventList = ({ eventList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { date, events } = eventList || {};

  const handleShowEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  console.log("eventList", eventList);
  return (
    <>
      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white 
      shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl max-w-lg mt-5 p-6"
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            <p className="text-indigo-500">Tuition events</p>
          </h1>

          {date && (
            <h1 className="text-sm font-semibold text-sky-700 mb-3">
              {new Date(date).toDateString()}
            </h1>
          )}
        </div>
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {event.name}
                  </p>
                  <p
                    className={classNames(
                      statuses[event.status],
                      "mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset"
                    )}
                  >
                    {event.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  <time dateTime={event.datetime}>
                    {new Date(event.datetime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button
                  onClick={() => handleShowEvent(event)}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                >
                  View event<span className="sr-only">, {event.name}</span>
                </button>
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      >
                        Edit<span className="sr-only">, {event.name}</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      >
                        Move<span className="sr-only">, {event.name}</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      >
                        Delete<span className="sr-only">, {event.name}</span>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500  mt-5">No events found.</p>
        )}
      </ul>

      {showModal && selectedEvent && (
        <ModalWrapper open={showModal} setOpen={setShowModal}>
          <EventDetailsCard selectedEvent={selectedEvent} />
        </ModalWrapper>
      )}
    </>
  );
};
export default TuitionEventList;
