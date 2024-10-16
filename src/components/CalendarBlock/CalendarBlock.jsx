import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DayCarsList from "../DayCarsList/DayCarsList";
import DetailsBtn from "../DetailsBtn/DetailsBtn";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import { getCarsByDate } from "../../redux/cars/operations.js";
import {
  selectDayCars,
  selectLoading,
  selectDate,
} from "../../redux/cars/selectors.js";
import styles from "./CalendarBlock.module.css";
import toast from "react-hot-toast";
import Modal from "../Modals/Modal/Modal.jsx";
import DayCarsModal from "../Modals/DayCarsModal/DayCarsModal.jsx";

export default function CalendarBlock() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carsData = useSelector(selectDayCars);
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (selectedDate) {
      dispatch(getCarsByDate(selectedDate))
        .unwrap()
        .then(() => {})
        .catch(() => {
          toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
        });
    }
  }, [dispatch, selectedDate]);


  const handleDetailsBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className={styles.calendarContainer}>
      <div className={styles.topContainer}>
        <CalendarPagination />
        {isLoading && <p>Завантаження інформації...</p>}
        <DayCarsList carsData={carsData} isModal={false} />
      </div>
      <DetailsBtn onClick={handleDetailsBtnClick} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <DayCarsModal
          carsData={carsData}
          isModal={true}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
