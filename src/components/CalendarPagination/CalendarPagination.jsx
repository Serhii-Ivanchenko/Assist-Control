import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCalendarByMonth } from "../../redux/cars/operations.js";
import {
  selectMonthlyLoad,
  selectDate,
  selectLoadingForCalendar,
} from "../../redux/cars/selectors.js";

import css from "./CalendarPagination.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Calendar from "../../components/Calendar/Calendar.jsx";
import { changeActualDate } from "../../redux/cars/slice.js";
import Loader from "../Loader/Loader.jsx";

function addMonths(date, months) {
  let result = new Date(date);
  let expectedMonth = (((result.getMonth() + months) % 12) + 12) % 12;
  result.setMonth(result.getMonth() + months);
  // Если произошло переполнение, исправляем
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0);
  }
  return result;
}

export default function CalendarPagination() {
  const dispatch = useDispatch();
  const monthlyLoadData = useSelector(selectMonthlyLoad);
  const currentMonth = new Date().toISOString().substring(0, 7);
  const currentDate = new Date().toISOString().substring(0, 10);
  const carSelectDate = useSelector(selectDate);
  const isLoadingForCalendar = useSelector(selectLoadingForCalendar);
  // const actualPercent = useSelector(selectPercent);

  if (carSelectDate === null) {
    dispatch(changeActualDate(currentDate));
  }
  //  const currentDay = new Date().getDate();

  const [queryMonth, setQueryMonth] = useState(new Date());

  const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth, 1));
  };

  const handleClickLeft = () => {
    setQueryMonth(addMonths(queryMonth, -1));
  };

  function literaFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  const options = {
    month: "long",
    year: "numeric",
  };

  let strMonth = literaFirst(
    queryMonth.toLocaleString("uk-UA", options).slice(0, -2)
  );
  let calendarMonth = queryMonth.toISOString().substring(0, 7);

  useEffect(() => {
    const fetchCalendarData = async () => {
      await Promise.all([dispatch(getCalendarByMonth(calendarMonth))]);
    };

    fetchCalendarData();
  }, [dispatch, calendarMonth]);

  let isCurrentMonth = currentMonth === calendarMonth ? true : false;

  const monthData = Object.entries(monthlyLoadData).map(([date, percent]) => ({
    date,
    percent,
  }));

  // if (actualPercent === null && monthData.length>0 ) {
  //   const resultObj = monthData.find(item => item.date === carSelectDate);

  //   dispatch(changeActualPercent(resultObj.percent));
  // }

  // let statisticMonthData =
  //     waterMonthData.map(el => ({
  //         ...el, day: el.date.substring(8, 10).replace(/^0+/, ''),  }));

  return (
    <div>
    <div className={css.containerpagin}>
      <div className={css.boxpagination}>
        <button className={css.iconstep} onClick={handleClickLeft}>
          <FiChevronLeft className={css.arrowIcon} />
        </button>
        <p className={css.namemonth}> {strMonth} </p>

        <button
          className={css.iconstep}
          onClick={handleClickRight}
          disabled={isCurrentMonth}
          style={{ cursor: "default" }}
        >
          <FiChevronRight className={css.arrowIcon} />
        </button>

      </div>
<p className={css.namemonth}> {carSelectDate} </p>
        </div>
      {isLoadingForCalendar ? (
        <Loader />
      ) : (
        <Calendar dataMonth={monthData} queryMonth={queryMonth} />
      )}
    </div>
  );
}
