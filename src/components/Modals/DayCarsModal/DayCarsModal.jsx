import styles from "./DayCarsModal.module.css";
import DayCarsFilter from "../../DayCarsFilter/DayCarsFilter";
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
  const [searchTerm, setSearchTerm] = useState("");


  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCars = () => {
    if (!searchTerm) return carsData; 
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    return carsData.filter(car => {
      const { plate, auto } = car;
      return plate.toLowerCase().includes(lowerCaseSearchTerm) || auto.toLowerCase().includes(lowerCaseSearchTerm); 
    });
  };

  return (
    <div className={styles.containerCarModal}>
      <div className={styles.header}>
        <label className={styles.switch}>
          <FiGrid
            className={`${styles.iconLeft} ${viewMode === "grid" ? styles.active : ""}`}
          />
          <BsListUl
            className={`${styles.iconRight} ${viewMode === "list" ? styles.active : ""}`}
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
        <div className={styles.search}>
          <DayCarsFilter value={searchTerm} onChange={handleSearch} />
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose className={styles.iconClose} />
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DayCarsList
          carsData={filteredCars()}
          viewMode={viewMode}
          isModal={isModal}
          // searchTerm={searchTerm}
        />
      )}
    </div>
  );
}
