import styles from "./DayCarsModal.module.css";
import { FiGrid } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../redux/cars/selectors";
import { useState } from "react";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";

export default function DayCarsModal({ onClose, isModal, carsData }) {
  const isLoading = useSelector(selectLoading);

  const [viewMode, setViewMode] = useState("grid");

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode)
  };


  return (
    <div className={styles.containerCarModal}>
      <div className={styles.header}>
        <label className={styles.switch}>
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
          <input
            type="checkbox"
            className={styles.input}
            checked={viewMode === "list"}
            onChange={() => {
              const newMode = viewMode === "grid" ? "list" : "grid";
              handleViewModeChange(newMode);
            }}
          />
          <span className={styles.slider}></span>
        </label>

        <button className={styles.closeButton} onClick={onClose}>
          <MdClose className={styles.iconClose} />
        </button>
      </div>

      <div className={styles.content}>
        {isLoading && <Loader />}
        <div className={styles.scrollableContent}>
          <DayCarsList
            carsData={carsData}
            viewMode={viewMode}
            isModal={isModal}
          />
        </div>
      </div>
    </div>
  );
}
