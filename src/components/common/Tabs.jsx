import { ChevronDownIcon } from "@heroicons/react/16/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ tabs, currentTab, onTabChange }) => {
  return (
    <div>
      {/* Mobile View */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab}
          onChange={(e) => onTabChange(e.target.value)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => onTabChange(tab.name)}
                aria-current={tab.name === currentTab ? "page" : undefined}
                className={classNames(
                  tab.name === currentTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2  py-4 text-sm font-medium cursor-pointer"
                )}
              >
                {tab.icon && (
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      tab.name === currentTab
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-2 -ml-0.5 size-5"
                    )}
                  />
                )}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
