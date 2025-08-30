export function generateCalendarDays(year, month, eventData) {
  const days = [];

  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay(); // Sunday = 0
  const calendarStartDate = new Date(year, month, 1 - startDay); // Sunday before the 1st

  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(calendarStartDate);
    currentDate.setDate(calendarStartDate.getDate() + i);

    const isCurrentMonth = currentDate.getMonth() === month;

    days.push(createDayObject(currentDate, isCurrentMonth, eventData));
  }

  return days;
}

function createDayObject(date, isCurrentMonth, eventData) {
  const yyyyMmDd = formatLocalDate(date);

  const matchingEvent = eventData?.find((e) => e.date === yyyyMmDd);

  return {
    date: yyyyMmDd,
    isToday: isToday(date),
    isCurrentMonth,
    events: matchingEvent?.events || [],
  };
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
