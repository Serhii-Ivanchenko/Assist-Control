 import { useDispatch, useSelector } from "react-redux";
 import { useEffect } from "react";
 import {getCalendarByMonth} from "../../redux/cars/operations.js";
 import {selectMonthCars,selectDate, } from "../../redux/cars/selectors.js";
// import {selectUser} from '../../../redux/user/selectors.js'
import css from './CalendarPagination.module.css';
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar.jsx'
import { changeActualDate } from "../../redux/cars/slice.js";

 

function addMonths(date, months) {
  let result = new Date(date);
  let expectedMonth = ((result.getMonth() + months) % 12 + 12) % 12; 
  result.setMonth(result.getMonth() + months);
  
  // Если произошло переполнение, исправляем
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0); 
  }
  return result;
}


export default function CalendarPagination() {
const dispatch = useDispatch();
  const carMonthData = useSelector(selectMonthCars);
  const currentMonth = new Date().toISOString().substring(0, 7);
  const currentDate = new Date().toISOString().substring(0, 10);
 const carSelectDate = useSelector(selectDate) ;
//   const userData = useSelector(selectUser); 
//   const totalByDate = useSelector(selectTotalValue);
  //  const isLoadingTracker = useSelector(selectLoadingTracker);
  if (carSelectDate === null) { dispatch(changeActualDate(currentDate)) };
   const currentDay = new Date().getDate();
//   const waterDailyNorm = userData.dailyNorm * 1000;
  //  let startday = 0;
  //  let endday = 6;


  const [queryMonth, setQueryMonth] = useState(new Date());
  //  const [ isCalendar, setIsCalendar ] = useState(true);

   const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth,1))
  };

   const handleClickLeft = () => {
     setQueryMonth(addMonths(queryMonth,-1))
  };

  //  const handleToggleCalendar = () => {
  //   setIsCalendar(!isCalendar);
  // };
  
  function literaFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
 
const options = {
  month: 'long',
   year: 'numeric'
  };
  
  

  let strMonth = literaFirst(queryMonth.toLocaleString("uk-UA", options));
  let calendarMonth = queryMonth.toISOString().substring(0, 7);
  let actualYear = queryMonth.getFullYear();
  let actualMonth = queryMonth.getMonth() + 1;
  
//   let actualDateTotal = waterSelectDate + String(totalByDate);

   useEffect(() => {
     
      const fetchCalendarData = async () => {
        await Promise.all([
          dispatch(getCalendarByMonth(calendarMonth)),
        ]);
      };

     fetchCalendarData();
     


    }, [dispatch, calendarMonth ]);

    let isCurrentMonth = currentMonth === calendarMonth ? true : false;
   console.log(carMonthData)
  
//   let endDay = isCurrentMonth && currentDay > 7 ? currentDay - 1 : 6;
//   let startDay = isCurrentMonth && currentDay > 7 ? currentDay - 6 : 0;
    
  // let statisticMonthData =
  //     waterMonthData.map(el => ({
  //         ...el, day: el.date.substring(8, 10).replace(/^0+/, ''),
       
  //   }));
//  console.log( statisticMonthData );
  return (
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
     
        <Calendar
          // monthData={waterMonthData}
          // waterDailyNorm={waterDailyNorm}
          // waterSelectDate={waterSelectDate}
        />
     
      {/* {!isCalendar && (
        <Statistics
          monthData={statisticMonthData}
          startDay={startDay}
          endDay={endDay}
        />
      )} */}
    </div>
  );
};
