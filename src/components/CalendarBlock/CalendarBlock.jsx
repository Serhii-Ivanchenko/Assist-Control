import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DayCarsList from "../DayCarsList/DayCarsList";
import DetailsBtn from "../sharedComponents/DetailsBtn/DetailsBtn.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import { getCarsByDate } from "../../redux/cars/operations.js";
import {
  selectDayCars,
  selectLoadingCarsByDay,
  selectDate,
} from "../../redux/cars/selectors.js";
import styles from "./CalendarBlock.module.css";
import toast from "react-hot-toast";
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";

export default function CalendarBlock() {
  const dispatch = useDispatch();

  const carsData = useSelector(selectDayCars);
  const selectedDate = useSelector(selectDate);
  const isLoadingCarsByDay = useSelector(selectLoadingCarsByDay);
  const selectedServiceId = useSelector(selectSelectedServiceId);
 

  useEffect(() => {
    if (!selectedServiceId) {
      console.warn("Service ID is not available yet. Skipping fetch.");
      return;
    }

    if (!selectedDate) {
      console.warn("Date is not selected. Skipping fetch.");
      return;
    }

    dispatch(getCarsByDate(selectedDate))
      .unwrap()
      .catch(() => {
        toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
      });
  }, [dispatch, selectedDate, selectedServiceId]);


  return (
    <div className={styles.calendarContainer}>
      <div className={styles.topContainer}>
        <CalendarPagination page={'video'} />
        {isLoadingCarsByDay && <p>Завантаження інформації...</p>}
        <DayCarsList
          carsData={carsData}
          isModal={false}
        />
      </div>
      <DetailsBtn/>
    </div>
  );
}
