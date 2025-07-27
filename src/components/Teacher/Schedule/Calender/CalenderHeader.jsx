import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import TuitionEventForm from "./TuitionEventForm";
import ModalWrapper from "../../../common/ModalWrapper";

const CalendarHeader = ({ currentMonth, currentYear, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      onChange(11, currentYear - 1);
    } else {
      onChange(currentMonth - 1, currentYear);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      onChange(0, currentYear + 1);
    } else {
      onChange(currentMonth + 1, currentYear);
    }
  };

  const goToToday = () => {
    const today = new Date();
    onChange(today.getMonth(), today.getFullYear());
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(currentYear, currentMonth));

  return (
    <>
      <header className="bg-white border border-b border-gray-200 flex items-center justify-between lg:flex-none px-6 py-4 lg:-mx-0.25">
        <h1 className="text-base font-semibold text-gray-900">
          <time
            dateTime={`${currentYear}-${String(currentMonth + 1).padStart(
              2,
              "0"
            )}`}
          >
            {formattedDate}
          </time>
        </h1>

        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-xs md:items-stretch">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" />
            </button>

            <button
              type="button"
              onClick={goToToday}
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>

            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" />
            </button>
          </div>

          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <div className="py-1">
                  {["Day", "Week", "Month", "Year"].map((view) => (
                    <MenuItem key={view}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {view} view
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <div className="ml-6 h-6 w-px bg-gray-300" />

            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-500"
            >
              Add event
            </button>
          </div>

          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="size-5" />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-3 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create event
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={goToToday}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Go to today
                  </a>
                </MenuItem>
                {["Day", "Week", "Month", "Year"].map((view) => (
                  <MenuItem key={view}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {view} view
                    </a>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      <ModalWrapper
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Add New Event"
      >
        <TuitionEventForm />
      </ModalWrapper>
    </>
  );
};

export default CalendarHeader;
