import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCalendarByMonth } from "../../redux/cars/operations.js";
import { getMonthlyLoad } from "../../redux/crm/operations.js";
import {
  selectMonthlyLoad,
  selectDate,
  selectLoadingForCalendar,
} from "../../redux/cars/selectors.js";
import { selectMonthlyLoadCrm } from "../../redux/crm/selectors.js";

import cssvideo from "./CalendarPagination.module.css";
import csscrm from "./CalendarPaginationCrm.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Calendar from "../../components/Calendar/Calendar.jsx";

import { changeActualDate } from "../../redux/cars/slice.js";
import Loader from "../Loader/Loader.jsx";
import CreateAppointmentBtn from "../CreateAppointmentBtn/CreateAppointmentBtn.jsx";
import ServiceBookingModal from "../Modals/ServiceBookingModal/ServiceBookingModal.jsx";
import Modal from "../Modals/Modal/Modal.jsx";
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";

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

export default function CalendarPagination({ page }) {
  const dispatch = useDispatch();

const pageConfigs = [
  {
    page: "crm",
    selector: selectMonthlyLoadCrm,
    css: csscrm,
    loadFunction: (dispatch, calendarMonth) => dispatch(getMonthlyLoad(calendarMonth)),
  },
  {
    page: "video",
    selector: selectMonthlyLoad,
    css: cssvideo,
    loadFunction: (dispatch, calendarMonth) => dispatch(getCalendarByMonth(calendarMonth)),
  },
  {
    page: "recom",
    selector: selectMonthlyLoadCrm,
    css: csscrm,
    loadFunction: (dispatch, calendarMonth) => dispatch(getMonthlyLoad(calendarMonth)),
  },
];

const currentPageConfig = pageConfigs.find((config) => config.page === page);
  const css = currentPageConfig.css;
  const monthlyLoadData = useSelector(currentPageConfig.selector);
 
  // const css = page === "video" ? cssvideo : csscrm;
  
  // const selectors = {
  // video: useSelector(selectMonthlyLoad),
  // crm: useSelector(selectMonthlyLoadCrm),
  // recom: useSelector(selectMonthlyLoadCrm),
  // };
  
  // const monthlyLoadData = selectors[page] ;

  
  const currentMonth = new Date().toISOString().substring(0, 7);
  const currentDate = new Date().toISOString().substring(0, 10);
  const carSelectDate = useSelector(selectDate);
  const isLoadingForCalendar = useSelector(selectLoadingForCalendar);
  // const actualPercent = useSelector(selectPercent);

  const selectedServiceId = useSelector(selectSelectedServiceId); // необхідно для коректної роботи вибору сервісів

  // if (carSelectDate === null) {
  //   dispatch(changeActualDate(currentDate));
  // }
  useEffect(() => {
    if (carSelectDate === null) {
      dispatch(changeActualDate(currentDate));
    }
  }, [carSelectDate, dispatch, currentDate]);
  //  const currentDay = new Date().getDate();

  const [queryMonth, setQueryMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth, 1));
  };

  const handleClickLeft = () => {
    setQueryMonth(addMonths(queryMonth, -1));
  };

  const handleAppointmentBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  // useEffect(() => {
  //   const fetchCalendarData = async () => {
  //     if (!selectedServiceId) {
  //       // console.warn("Service ID is not available yet. Skipping fetch.");
  //       return;
  //     }
  //     if (page==='crm') {
  //       await dispatch(getMonthlyLoad(calendarMonth));
  //     } else {
  //       await dispatch(getCalendarByMonth(calendarMonth));
  //     }
  //   };

  //   fetchCalendarData();
  // }, [dispatch, calendarMonth, selectedServiceId, page]); // необхідно для коректної роботи вибору сервісів


 useEffect(() => {
    const fetchCalendarData = async () => {
      if (!selectedServiceId) {
        console.warn("Service ID is not available yet. Skipping fetch.");
        return;
      }

      try {
        await currentPageConfig.loadFunction(dispatch, calendarMonth);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchCalendarData();
  }, [dispatch, calendarMonth, selectedServiceId]);



  let isCurrentMonth = currentMonth === calendarMonth ? true : false;

  let crmSelectDate = carSelectDate
    ? carSelectDate.substring(8, 10) +
      "." +
      carSelectDate.substring(5, 7) +
      "." +
      carSelectDate.substring(2, 4)
    : "";

  const monthData = Object.entries(monthlyLoadData).map(([date, percent]) => ({
    date,
    percent,
  }));


  console.log(monthlyLoadData);

  // if (actualPercent === null && monthData.length>0 ) {
  //   const resultObj = monthData.find(item => item.date === carSelectDate);

  //   dispatch(changeActualPercent(resultObj.percent));
  // }

  // let statisticMonthData =
  //     waterMonthData.map(el => ({
  //         ...el, day: el.date.substring(8, 10).replace(/^0+/, ''),  }));

  return (
    <div className={css.calendarWrapper}>
      <div className={css.containerpagin}>
        <div className={css.boxpagination}>
          <button className={css.iconstep} onClick={handleClickLeft}>
            <FiChevronLeft className={css.arrowIcon} />
          </button>
          <p className={css.namemonth}> {strMonth} </p>

          <button
            className={css.iconstep}
            onClick={handleClickRight}
            disabled={isCurrentMonth && page!=="crm"}
            style={page!=="crm" ? { cursor: "default" } : { cursor: "pointer" }}
          >
            <FiChevronRight className={css.arrowIcon} />
          </button>
        </div>
        {(page==="crm" || page==="recom" )&& (
          <div className={css.crmblock} style={{width: page==="crm" ? "217px": "65px"}}>
            <p className={css.datemont}> {crmSelectDate} </p>
         {page==="crm" && (   <CreateAppointmentBtn onClick={handleAppointmentBtnClick} />)}
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ServiceBookingModal
                  recordId={null}
                  postId={null}
                  onClose={handleCloseModal}
                  carSelectDate={carSelectDate}
                />
              </Modal>
            )}
          
          </div>
        )}
      </div>
      {isLoadingForCalendar ? (
        <Loader />
      ) : (
        <Calendar dataMonth={monthData} queryMonth={queryMonth} page={page} />
      )}
    </div>
  );
}
