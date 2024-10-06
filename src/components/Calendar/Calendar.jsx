// import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"; // для начала недели с понедельника
import css from "./Calendar.module.css";

dayjs.extend(isoWeek);

const Calendar = () => {
  let currentDate = dayjs();
  // const [currentDate, setCurrentDate] = useState(dayjs()); // Текущая дата
  const startOfMonth = currentDate.startOf("month"); // Начало месяца
  const endOfMonth = currentDate.endOf("month"); // Конец месяца
  const startOfCalendar = startOfMonth.isoWeekday(1); // Начинаем календарь с понедельника
  const endOfCalendar = endOfMonth.isoWeekday(7); // Заканчиваем неделю на воскресенье

  // Генерируем массив дат для отображения в календаре
  const generateCalendarDates = () => {
    let dates = [];
    let date = startOfCalendar;

    while (date.isBefore(endOfCalendar)) {
      dates.push(date);
      date = date.add(1, "day");
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  // const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  // const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className={css.containercalendar}>
      <div className={css.weekdays}>
        {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((day) => (
          <div className={css.weekdays} key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className={css.calendargrid}>
        {calendarDates.map((date, index) => (
          <div
            key={index}
            className={`calendar-day ${
              date.month() !== currentDate.month() ? "other-month" : ""
            } ${date.isSame(dayjs(), "day") ? "today" : ""}`}
          >
            {date.date()}
          </div>
        ))}
      </div>

      <style>{`
        
        .calendar-day {
          text-align: center;
          color: #FFF;
          width: 36px;
          background-color: #A97742;
height: 18px;
border-radius: 5px;

font-variant-numeric: lining-nums proportional-nums;
font-family: "Roboto", sans-serif;
font-size: 12px;
font-style: normal;
font-weight: 300;
line-height: normal;
        }
        .other-month {
          background-color: #4A4A4A;
          color: #4A4A4A;
        }
        .today {
          border: 1px solid #fff;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
