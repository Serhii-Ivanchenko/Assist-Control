import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectDate} from "../../redux/cars/selectors.js";
import {
  changeActualDate,
  changeActualPercent,
} from "../../redux/cars/slice.js";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"; // для начала недели с понедельника
import css from "./Calendar.module.css";

dayjs.extend(isoWeek);


export default function Calendar({ queryMonth, dataMonth }) {
  let currentDate = dayjs();
  let queryMonthDayjs = dayjs(queryMonth);
  const dispatch = useDispatch();
  const carSelectDate = useSelector(selectDate);
  // const [currentDate, setCurrentDate] = useState(dayjs()); // Текущая дата
  const startOfMonth = dayjs(queryMonth).startOf("month"); // Начало месяца
  const endOfMonth = dayjs(queryMonth).endOf("month"); // Конец месяца
  const startOfCalendar = startOfMonth.isoWeekday(1); // Начинаем календарь с понедельника
  const endOfCalendar = endOfMonth.isoWeekday(7); // Заканчиваем неделю на воскресенье
  const [selectedDate, setSelectedDate] = useState(dayjs(carSelectDate));

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

  const addDataToDates = (calendarDates, dataMonth) => {
    return calendarDates.map((date) => {
      const dataMonthObj = dataMonth.find((data) => {
        const dataDate = dayjs(data.date, "YYYY-MM-DD");
        return dataDate.isSame(date, "day");
      });
      return {
        date: date,
        percent: dataMonthObj ? dataMonthObj.percent : null,
      };
    });
  };

  const calendarDates = generateCalendarDates();

  const calendarWithPercent = addDataToDates(calendarDates, dataMonth);

  const handleDateClick = (data, selectdate, percent) => {
    if (!isDateDisabled(data.date)) {
      setSelectedDate(data.date);

      dispatch(changeActualDate(selectdate));
      dispatch(changeActualPercent(percent));
    }
  };

  const getButtonColor = (percent) => {
    if (percent >= 80) {
      return "#DB8120";
    } else if (percent >= 50) {
      return "#A97742";
    } else if (percent > 0) {
      return "#755D45";
    } else {
      return "#4A4A4A";
    }
  };

  const isDateDisabled = (date) => {
    return (
      date.isAfter(currentDate, "day") ||
      date.isAfter(currentDate, "month") ||
      !date.isSame(queryMonthDayjs, "month")
    );
  };

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
        {calendarWithPercent.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              handleDateClick(
                item,
                item.date.format("YYYY-MM-DD"),
                item.percent
              )
            }
            disabled={isDateDisabled(item.date)}
            style={{
              backgroundColor: getButtonColor(item.percent),
              border: item.date.isSame(selectedDate, "day")
                ? " 4px solid #fff"
                : "1px solid transparent",
            }}
            className={`calendar-day  
              ${item.date.date() > currentDate.date() ? "cursordefault" : ""} 
              ${
                item.date.month() !== queryMonthDayjs.month()
                  ? "other-month"
                  : ""
              } 
              ${item.date.isSame(selectedDate, "day") ? "today" : ""}`}
          >
            {item.date.date()}
          </button>
        ))}
      </div>

      <style>{`
        
        .calendar-day {
          text-align: center;
          color: #FFF;
          width: 36px;
          height: 18px;
          border-radius: 5px;
          cursor: pointer;
          font-variant-numeric: lining-nums proportional-nums;
          font-family: "Roboto", sans-serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          border:none;
        }

        @media only screen and (min-width: 1920px) {
        .calendar-day {
        width: 54px;
          height: 27px;
          font-size: 16px; }}

        .cursordefault{
        cursor: default;
         }

        .other-month {
          background-color: #4A4A4A;
          color: #4A4A4A;
          cursor: default;
        }
        .today {
          border: 4px solid #fff;
        }
      `}</style>
    </div>
  );
}
