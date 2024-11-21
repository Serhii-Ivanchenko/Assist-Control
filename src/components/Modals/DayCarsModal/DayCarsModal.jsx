import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectDate,
  selectDayCars,
  selectLoading,
  selectVisibilityCar,
} from "../../../redux/cars/selectors";
import styles from "./DayCarsModal.module.css";
import DayCarsFilter from "../../DayCarsFilter/DayCarsFilter";
import { FiGrid } from "react-icons/fi";
import { BsListUl, BsDownload } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";
import CalendarInModalCar from "../../CalendarInModalCar/CalendarInModalCar";
import StatusFilterCars from "../../StatusFilterCars/StatusFilterCars";
import { useDispatch } from "react-redux";
import { toggleVisibilityCar } from "../../../redux/cars/slice";
import CarInfoSettings from "../../sharedComponents/CarInfoSettings/CarInfoSettings";
import TimeSortCarItem from "../../sharedComponents/TimeSortCarItem/TimeSortCarItem";

export default function DayCarsModal({ onClose, isModal}) {
  const dispatch = useDispatch();
  const visibility = useSelector(selectVisibilityCar);
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);
  const carsData = useSelector(selectDayCars);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredCarsData, setFilteredCarsData] = useState(carsData);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDescending, setIsDescending] = useState(true);
  

  useEffect(() => {
    let filteredData = [...carsData];
  
    // Функція для обчислення часу в мілісекундах між двома датами
    const getDurationInMillis = (startDate, completeDate) => {
      const start = new Date(startDate);
      const end = completeDate ? new Date(completeDate) : new Date();
      return end - start; // повертаємо різницю в мілісекундах
    };
  
    // Сортування за тривалістю (часом)
    filteredData.sort((a, b) => {
      const durationA = getDurationInMillis(a.date_s, a.complete_d);
      const durationB = getDurationInMillis(b.date_s, b.complete_d);
      return isDescending ? durationB - durationA : durationA - durationB;
    });
  
    // Фільтрація по статусу
    if (selectedStatus !== "all") {
      filteredData = filteredData.filter((car) => car.status === selectedStatus);
    }
  
    // Фільтрація по датах
    if (startDate && endDate) {
      const clearTime = (date) => new Date(date.setHours(0, 0, 0, 0));
      filteredData = filteredData.filter((car) => {
        const carStartDate = clearTime(new Date(car.date_s));
        const carEndDate = clearTime(new Date(car.date_e));
        return carStartDate <= endDate && carEndDate >= startDate;
      });
    }
  
    setFilteredCarsData(filteredData);
  }, [selectedStatus, startDate, endDate, carsData, isDescending]);

  const handleStatusChange = (status) => setSelectedStatus(status);
  const handleDateBegChange = (date) => setStartDate(date);
  const handleDateEndChange = (date) => setEndDate(date);
  const handleViewModeChange = (newMode) => setViewMode(newMode);
  const handleSortChange = (descending) => setIsDescending(descending);

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

  const handleToggle = (field) => {
    const newVisibility = { ...visibility, [field]: !visibility[field] };
    dispatch(toggleVisibilityCar(newVisibility));
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
          <div>
          <TimeSortCarItem onSortChange={handleSortChange}/>
          </div>
        </div>
        <div className={styles.rightHeader}>
          <StatusFilterCars onStatusChange={handleStatusChange} />
          <CalendarInModalCar
            selectedDate={selectedDate}
            startDate={startDate}
            endDate={endDate}
            onDateBegChange={handleDateBegChange}
            onDateEndChange={handleDateEndChange}
          />
          <div className={styles.btnPdfContainer}>
            <button className={styles.btnPdf}>
              <BsDownload size={16} color="var(--icon-gray)" />
              <span className={styles.btnPdfText}>.pdf</span>
            </button>
          </div>
          <CarInfoSettings
            isCrmView={false}
            handleToggle={handleToggle}
          />
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
