import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DayCarsList from "../DayCarsList/DayCarsList";
import DetailsBtn from "../sharedComponents/DetailsBtn/DetailsBtn.jsx";
import Modal from "../Modals/Modal/Modal.jsx";
import DayCarsModal from "../Modals/DayCarsModal/DayCarsModal.jsx";
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

  const selectedServiceId = useSelector(selectSelectedServiceId); // необхідно для коректної роботи вибору сервісів

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
  }, [dispatch, selectedDate, selectedServiceId]); // необхідно для коректної роботи вибору сервісів

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.topContainer}>
        <CalendarPagination isCrm={false} />
        {isLoadingCarsByDay && <p>Завантаження інформації...</p>}
        <DayCarsList carsData={carsData} isModal={false} />
      </div>
      <DetailsBtn carsData={carsData} selectedDate={selectedDate}/>
    </div>
  );
}
