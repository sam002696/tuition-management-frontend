import { Bars3Icon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/20/solid";
// import NotificationsButton from "../../components/Teacher/NotificationsButton";
// import UserMenu from "../../components/Teacher/UserMenu";
import DateTime from "../../components/Teacher/DateTime";

export default function Topbar({ onSidebarToggle }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 items-center justify-end bg-white px-6 shadow-sm">
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="text-gray-700 lg:hidden"
        onClick={onSidebarToggle}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Search */}
      {/* <form className="flex flex-1 mx-4" action="#" method="GET">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
          />
        </div>
      </form> */}

      {/* Right Section */}
      <div className="flex items-center gap-x-4 lg:gap-x-6 ">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>
        {/* <NotificationsButton /> */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
        {/* <UserMenu /> */}
        <DateTime />
      </div>
    </div>
  );
}
