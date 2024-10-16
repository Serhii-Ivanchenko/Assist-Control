import styles from "./DayCarsModal.module.css";
import { FiGrid } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDate,
  selectDayCars,
  selectLoading,
} from "../../../redux/cars/selectors";
import { useEffect, useState } from "react";
import { getCarsByDate } from "../../../redux/cars/operations";
import toast from "react-hot-toast";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";

export default function DayCarsModal({ onClose }) {
  const dispatch = useDispatch();
  const carsData = useSelector(selectDayCars);
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);
  const [viewMode, setViewMode] = useState("grid");

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

  return (
    <div className={styles.containerCarModal}>
      <div className={styles.header}>
        <div className={styles.switch}>
          <input
            type="checkbox"
            className="input"
            checked={viewMode === "grid"}
            onChange={() => setViewMode(viewMode === "list" ? "grid" : "list")}
          />
          <span className={styles.slider}></span>
          <FiGrid
            className={`${styles.iconLeft} ${
              viewMode === "grid" ? styles.active : ""
            }`}
          />
          <BsListUl
            className={`${styles.iconRight} ${
              viewMode === "list" ? styles.active : ""
            }`}
          />
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose className={styles.iconClose} />
        </button>
      </div>

      <div className={styles.content}>
        {isLoading && <Loader/>}
        <DayCarsList carsData={carsData} viewMode={viewMode} />
      </div>
    </div>
  );
}
