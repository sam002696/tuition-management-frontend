import { useState } from "react";
import CalenderHeader from "./CalenderHeader";
import CalendarDayCell from "./CalendarDayCell";
import MobileEventList from "./MobileEventList";

const Calender = ({ selectedStudent }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleDateChange = (newMonth, newYear) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      {selectedStudent && (
        <>
          <CalenderHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            onChange={handleDateChange}
            selectedStudent={selectedStudent}
          />

          <CalendarDayCell
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedStudent={selectedStudent}
          />

          <div className="block lg:hidden">
            <MobileEventList
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Calender;
