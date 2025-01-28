import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "../../redux/cars/selectors.js";
import {
  changeActualDate,
  changeActualPercent,
} from "../../redux/cars/slice.js";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"; // для начала недели с понедельника
import cssvideo from "./Calendar.module.css";
import csscrm from "./CalendarCrm.module.css";
import cssrecom from "./CalendarRecom.module.css";

dayjs.extend(isoWeek);

export default function Calendar({ queryMonth, dataMonth, page }) {
  // const css = page === "video" ? cssvideo : csscrm : cssrecom;
  let css;

  switch (page) {
    case "video":
      css = cssvideo;
      break;
    case "crm":
      css = csscrm;
      break;
    case "recom":
      css = cssrecom;
      break;
    default:
      css = cssvideo; // або якийсь стандартний CSS
      break;
  }

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

  if (page === "video" && selectedDate > currentDate) {
    setSelectedDate(currentDate);
    dispatch(changeActualDate(currentDate.format("YYYY-MM-DD")));
  }

  // Генерируем массив дат для отображения в календаре
  // const generateCalendarDates = () => {
  //   let dates = [];
  //   let date = startOfCalendar;

  //   while (date.isBefore(endOfCalendar)) {
  //     dates.push(date);
  //     date = date.add(1, "day");
  //   }

  //   return dates;
  // };

  const generateCalendarDates = () => {
    let dates = [];
    let date = startOfCalendar; // Начинаем с понедельника первой недели

    // Генерация всех дат до конца недели последнего дня месяца
    while (
      date.isBefore(endOfCalendar, "day") ||
      date.isSame(endOfCalendar, "day")
    ) {
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
    if (percent >= 150) {
      return "#DB3020";
    } else if (percent >= 130) {
      return "#DB4C20";
    } else if (percent >= 80) {
      return "var(--orange)";
    } else if (percent >= 50) {
      return "var(--mid-orange)";
    } else if (percent > 0) {
      return "var( --dark-orange)";
    } else {
      return "var(--input-stroke)";
    }
  };

  const getButtonColorCrm = (percent) => {
    if (percent >= 80) {
      return "#DB3020";
    } else if (percent >= 60) {
      return "#DB4C20";
    } else if (percent >= 40) {
      return "var(--orange)";
    } else if (percent >= 20) {
      return "var(--mid-orange)";
    } else if (percent > 0) {
      return "var( --dark-orange)";
    } else {
      return "var(--input-stroke)";
    }
  };

  const determineBackgroundColor = (page, item) => {
    if (page === "video") return getButtonColor(item.percent);
    if (page === "crm") return getButtonColorCrm(item.percent);
    if (page === "recom" && item.date.date() === 15) return "var(--bg)";
    if (page === "recom") return getButtonColorCrm(item.percent);
    return "defaultBackgroundColor";
  };

  //   const isDateDisabled = (date) => {
  //     if (!isCrm) {
  //       return (
  //         date.isAfter(currentDate, "day") ||
  //         date.isAfter(currentDate, "month") ||
  //         !date.isSame(queryMonthDayjs, "month")
  //       );
  //     }
  //     else {
  //  return (

  //         !date.isSame(queryMonthDayjs, "month")
  //       );

  //     }
  //   };

  const isDateDisabled = (date) => {
    if (page === "video") {
    const isCurrentMonth = date.isSame(currentDate, "month");
    const isAfterToday = date.isAfter(currentDate, "day");
    return isCurrentMonth && isAfterToday;
    } else {
      return false; // Все даты кликабельны для `isCrm = true`
    }
  };

  if (carSelectDate !== selectedDate) {
    setSelectedDate(carSelectDate);
  }

  return (
    <div className={css.containercalendar}>
      <div className={css.weekdays}>
        {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((day) => (
          <div className={css.weekdaysday} key={day}>
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
              // backgroundColor: page !== "video"
              //   ? getButtonColorCrm(item.percent)
              //   : getButtonColor(item.percent),
              backgroundColor: determineBackgroundColor(page, item),
            }}
            className={`calendar-day  
              ${page === "crm" || page === "recom" ? "crm-width" : ""} 
             ${
               page === "video" && item.date.date() > currentDate.date() && item.date.month() === currentDate.month()
                 ? "cursordefault"
                 : ""
             } 
              ${
                item.date.month() !== queryMonthDayjs.month()
                  ? "other-month"
                  : ""
              } 
              ${item.date.isSame(selectedDate, "day") ? "today" : ""}
              ${
                page === "recom" && item.date.date() === 15 ? "redafter" : ""
              } `}
          >
            {item.date.date()}
          </button>
        ))}
      </div>

      <style>{`
        
         .calendar-day {
          text-align: center;
          color: var(--white);
         width: 54px;
          height: 27px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          font-variant-numeric: lining-nums proportional-nums;
          font-family: "Roboto", sans-serif;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          border:none;
          position: relative;
        }

          .crm-width { width: 52px;}

        .cursordefault{
        cursor: default;
        color: var(--text-gray)
         }

        .other-month {
          background-color: var(--input-stroke);
         color: var(--text-gray);
          cursor: default;
        }
        .today {
           border: 1px solid var(--white);
           z-index: 1;
        }

.redafter{
 color: #F00;
 border: 1px solid #F00;
  background-color:var(--bg);
           z-index: 1;
}

.redafter::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid #F00;
    border-radius: 5px;
    pointer-events: none;
     z-index: -1;
}

.today::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid var(--white);
    border-radius: 5px;
    pointer-events: none;
     z-index: -1;
}

      `}</style>
    </div>
  );
}
