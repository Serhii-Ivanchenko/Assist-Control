import styles from "./DayCarsModal.module.css";
import DayCarsFilter from "../../DayCarsFilter/DayCarsFilter";
import { FiGrid } from "react-icons/fi";
import { BsListUl, BsSortUp, BsDownload } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../redux/cars/selectors";
import { useState, useEffect } from "react";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";
import CalendarInModalCar from "../../CalendarInModalCar/CalendarInModalCar";

export default function DayCarsModal({ onClose, isModal, carsData, selectedDate }) {
  const isLoading = useSelector(selectLoading);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredCarsData, setFilteredCarsData] = useState([]);

  // Оновлення фільтрованих даних при зміні діапазону дат
  useEffect(() => {
    // Функція для обнулення часу в даті
    const clearTime = (date) => new Date(date.setHours(0, 0, 0, 0));
  
    const filteredData = carsData.filter((car) => {
      const carStartDate = clearTime(new Date(car.date_s)); // Початок періоду машини
      const carEndDate = clearTime(new Date(car.date_e)); // Кінець періоду машини
  
      // Перевірка, чи хоча б частина періоду машини знаходиться в межах діапазону
      return (carStartDate <= endDate && carEndDate >= startDate);
    });
  
    setFilteredCarsData(filteredData);
  }, [startDate, endDate, carsData]);

  const handleDateBegChange = (date) => {
    setStartDate(date);
  };

  const handleDateEndChange = (date) => {
    setEndDate(date);
  };

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleSearch = (term) => {
    if (/^[a-zA-Z0-9]*$/.test(term)) {
      setSearchTerm(term);
      setInputError("");
    } else {
      setInputError("Вводьте лише латинські літери та цифри");
      setSearchTerm(term);
    }
  };

  const filteredCars = () => {
    if (!searchTerm) return filteredCarsData;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return filteredCarsData.filter((car) => {
      const { plate, auto } = car;
      return (
        plate.toLowerCase().includes(lowerCaseSearchTerm) ||
        auto.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  };

  return (
    <div className={styles.containerCarModal}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <label className={styles.switch}>
            <FiGrid className={`${styles.iconLeft} ${viewMode === "grid" ? styles.active : ""}`} />
            <BsListUl className={`${styles.iconRight} ${viewMode === "list" ? styles.active : ""}`} />
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
            <DayCarsFilter value={searchTerm} onChange={handleSearch} error={inputError} />
          </div>
          <div className={styles.filterContainer}>
            <button className={styles.filter}>
              <BsSortUp size={18} />
            </button>
          </div>
        </div>
        <div className={styles.rightHeader}>
          <CalendarInModalCar
            selectedDate={selectedDate}
            startDate={startDate}
            endDate={endDate}
            onDateBegChange={handleDateBegChange}
            onDateEndChange={handleDateEndChange}
          />
          <div className={styles.btnPdfContainer}>
            <button className={styles.btnPdf}>
              <BsDownload size={16} color="#C7C7C7" />
              <span className={styles.btnPdfText}>.pdf</span>
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
        <DayCarsList carsData={filteredCars()} viewMode={viewMode} isModal={isModal} />
      )}
    </div>
  );
}
