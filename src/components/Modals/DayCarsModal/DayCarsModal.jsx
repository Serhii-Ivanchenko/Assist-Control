import styles from "./DayCarsModal.module.css";
import DayCarsFilter from "../../DayCarsFilter/DayCarsFilter";
import { FiGrid } from "react-icons/fi";
import { BsListUl, BsSortUp, BsDownload } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
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
  const [inputError, setInputError] = useState("");

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleSearch = (term) => {
    // Перевірка на латинські літери та цифри
    if (/^[a-zA-Z0-9]*$/.test(term)) {
      setSearchTerm(term); // Оновлюємо searchTerm тільки якщо введення коректне
      setInputError(""); // Очищаємо повідомлення про помилку
    } else {
      setInputError("Вводьте лише латинські літери та цифри");
      setSearchTerm(term); // Оновлюємо searchTerm, навіть якщо введення некоректне
    }
  };

  const filteredCars = () => {
    if (!searchTerm) return carsData; // Повертаємо всі автомобілі, якщо searchTerm порожній

    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Перетворюємо searchTerm в нижній регістр

    return carsData.filter((car) => {
      const { plate, auto } = car; // Передбачається, що car має поля plate і auto
      return (
        plate.toLowerCase().includes(lowerCaseSearchTerm) ||
        auto.toLowerCase().includes(lowerCaseSearchTerm)
      ); // Перетворюємо plate і auto в нижній регістр
    });
  };

  return (
    <div className={styles.containerCarModal}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
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
          <div className={styles.search}>
            <DayCarsFilter
              value={searchTerm}
              onChange={handleSearch}
              error={inputError}
            />
          </div>
          <div className={styles.filterContainer}>
            <button className={styles.filter}>
              <BsSortUp size={18} />
            </button>
          </div>
        </div>
        <div className={styles.rightHeader}>
        <div className={styles.dateRangeContainer}>
    <label htmlFor="startDate" className={styles.label}>З </label>
    <input type="date" id="startDate" className={styles.dateInput} />
    
    <label htmlFor="endDate" className={styles.label}>По </label>
    <input type="date" id="endDate" className={styles.dateInput} />
</div>
          <div className={styles.btnPdfContainer}>
            <button className={styles.btnPdf}>
            <BsDownload  size={16} color="#C7C7C7"/>
            <span className={styles.btnPdfText}>
              .pdf
            </span>
            </button>
          </div>
          <button className={styles.btnSettings}>
            <GiSettingsKnobs className={styles.iconSettings} />
          </button>
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose className={styles.iconClose} />
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <DayCarsList
          carsData={filteredCars()}
          viewMode={viewMode}
          isModal={isModal}
        />
      )}
    </div>
  );
}
