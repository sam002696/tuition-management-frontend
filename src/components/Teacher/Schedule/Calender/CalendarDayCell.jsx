import { useEffect, useState } from "react";
import { generateCalendarDays } from "../../../../utils/calendarUtils";
import { useDispatch, useSelector } from "react-redux";

const convertTo12HourFormat = (time24) => {
  if (!time24) return "";
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
};

const getEventTextColor = (status) => {
  switch (status) {
    case "accepted":
      return "text-green-600 group-hover:text-green-800";
    case "pending":
      return "text-yellow-600 group-hover:text-yellow-800";
    case "rejected":
      return "text-red-600 group-hover:text-red-800";
    default:
      return "text-gray-900 group-hover:text-indigo-600"; // fallback
  }
};

const CalendarDayCell = ({ currentMonth, currentYear, selectedStudent }) => {
  const { specificStudentEvents } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);

  // fetch specific student events

  useEffect(() => {
    dispatch({
      type: "FETCH_SPECIFIC_STUDENT_EVENTS",
      payload: {
        student_id: selectedStudent?.student?.id,
      },
    });
  }, [selectedStudent?.student?.id, dispatch]);

  // calender to generate days

  useEffect(() => {
    const transformed = specificStudentEvents.reduce((acc, item) => {
      const date = item?.scheduled_at.split(" ")[0];
      const time = item?.scheduled_at.split(" ")[1]?.slice(0, 5);

      const formattedEvent = {
        id: item?.id,
        name: item?.title,
        time: convertTo12HourFormat(time),
        datetime: item?.scheduled_at.replace(" ", "T"),
        status: item?.status,
        href: "#",
      };

      const existing = acc.find((e) => e.date === date);
      if (existing) {
        existing.events.push(formattedEvent);
      } else {
        acc.push({ date, events: [formattedEvent] });
      }

      return acc;
    }, []);

    const generatedDays = generateCalendarDays(
      currentYear,
      currentMonth,
      transformed
    );
    setDays(generatedDays);
  }, [
    specificStudentEvents,
    currentYear,
    currentMonth,
    selectedStudent?.student?.id,
  ]);

  return (
    <div className="shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
      <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="flex justify-center bg-white py-2">
            <span>{day[0]}</span>
            <span className="sr-only sm:not-sr-only">{day.slice(1)}</span>
          </div>
        ))}
      </div>

      <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {days.map((day) => (
            <div
              key={day.date}
              data-is-today={day.isToday ? "" : undefined}
              data-is-current-month={day.isCurrentMonth ? "" : undefined}
              className="relative h-28 bg-gray-50 px-3 py-2 text-gray-500 data-is-current-month:bg-white"
            >
              <time
                dateTime={day.date}
                className="in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-600 in-data-is-today:font-semibold in-data-is-today:text-white"
              >
                {day.date.split("-").pop().replace(/^0/, "")}
              </time>

              {day.events?.length > 0 && (
                <ol className="mt-2">
                  {day.events.slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <a href={event.href} className="group flex">
                        <p
                          className={`flex-auto truncate font-medium ${getEventTextColor(
                            event.status
                          )}`}
                        >
                          {event.name}
                        </p>

                        <time
                          dateTime={event.datetime}
                          className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block font-semibold"
                        >
                          {event.time}
                        </time>
                      </a>
                    </li>
                  ))}
                  {day.events.length > 2 && (
                    <li className="text-gray-500">
                      + {day.events.length - 2} more
                    </li>
                  )}
                </ol>
              )}
            </div>
          ))}
        </div>

        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              data-is-today={day.isToday ? "" : undefined}
              data-is-current-month={day.isCurrentMonth ? "" : undefined}
              className="flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-50 hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white"
            >
              <time dateTime={day.date}>
                {day.date.split("-").pop().replace(/^0/, "")}
              </time>
              {day.events?.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  {day.events.map((event) => (
                    <span
                      key={event.id}
                      className="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-400"
                    />
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarDayCell;
