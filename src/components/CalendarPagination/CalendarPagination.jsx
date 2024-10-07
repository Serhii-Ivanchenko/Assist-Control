// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import {getMonthWaterByMonth} from "../../../redux/water/operations.js";
// import {selectMonthWaterItems,selectDate, selectTotalValue,} from "../../../redux/water/selectors.js";
// import {selectUser} from '../../../redux/user/selectors.js'
import css from './CalendarPagination.module.css';
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar.jsx'

 

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
// const dispatch = useDispatch();
//   const waterMonthData = useSelector(selectMonthWaterItems);
//   const waterSelectDate = useSelector(selectDate);
//   const userData = useSelector(selectUser); 
//   const totalByDate = useSelector(selectTotalValue);
  //  const isLoadingTracker = useSelector(selectLoadingTracker);
  // const currentMonth = new Date().toISOString().substring(0, 7);
  // const currentDay = new Date().getDate();
//   const waterDailyNorm = userData.dailyNorm * 1000;
  //  let startday = 0;
  //  let endday = 6;

 

  const [queryMonth, setQueryMonth] = useState(new Date());
  // const [ isCalendar, setIsCalendar ] = useState(true);

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
//   year: 'numeric'
};

  let strMonth = literaFirst(queryMonth.toLocaleString("ua-UA", options));
  // let calendarMonth = queryMonth.toISOString().substring(0, 7);
  
//   let actualDateTotal = waterSelectDate + String(totalByDate);

  // useEffect(() => {
     
  //    const fetchWaterData = async () => {
  //      await Promise.all([
  //        dispatch(getMonthWaterByMonth(calendarMonth)),
  //      ]);
  //    };

  //    fetchWaterData();
  //  }, [dispatch, calendarMonth, waterDailyNorm, actualDateTotal ]);

  //  let isCurrentMonth = currentMonth === calendarMonth ? true : false;
  
  
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
              // disabled={isCurrentMonth}
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
