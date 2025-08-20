import { ClockIcon } from "@heroicons/react/20/solid";
const events = [
  {
    id: 1,
    name: "Maple syrup museum",
    time: "3PM",
    datetime: "2022-01-15T09:00",
    href: "#",
  },
  {
    id: 2,
    name: "Hockey game",
    time: "7PM",
    datetime: "2022-01-22T19:00",
    href: "#",
  },
];

const MobileEventList = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:hidden">
      <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow-sm ring-1 ring-black/5">
        {events.map((event) => (
          <li
            key={event.id}
            className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
          >
            <div className="flex-auto">
              <p className="font-semibold text-gray-900">{event.name}</p>
              <time
                dateTime={event.datetime}
                className="mt-2 flex items-center text-gray-700"
              >
                <ClockIcon
                  aria-hidden="true"
                  className="mr-2 size-5 text-gray-400"
                />
                {event.time}
              </time>
            </div>
            <a
              href={event.href}
              className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-xs ring-1 ring-gray-300 ring-inset group-hover:opacity-100 hover:ring-gray-400 focus:opacity-100"
            >
              Edit<span className="sr-only">, {event.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MobileEventList;
