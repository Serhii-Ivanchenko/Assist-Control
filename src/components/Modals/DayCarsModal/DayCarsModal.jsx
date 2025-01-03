import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDate,
  selectDayCars,
  selectLoading,
  selectPeriodCars,
} from "../../../redux/cars/selectors";
import styles from "./DayCarsModal.module.css";
import { FiGrid } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";
import CalendarPeriodSelector from "../../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import StatusFilter from "../../sharedComponents/StatusFilter/StatusFilter";
import InfoSettingsVisibility from "../../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import TimeSortItem from "../../sharedComponents/TimeSortItem/TimeSortItem";
import { getPeriodCars } from "../../../redux/cars/operations";
import toast from "react-hot-toast";
import CarsSearch from "../../sharedComponents/CarsSearch/CarsSearch";
import {
  validateSearchTerm,
  filterCarsBySearchTerm,
} from "../../../utils/filterCarsBySearchTerm";
import renderStatusCars from "../../../utils/renderStatusCars";
import { labelNamesInModal, statusesCar } from "../../../utils/dataToRender.js";
import { selectVisibilityCar } from "../../../redux/visibility/selectors.js";
import { toggleVisibilityCar } from "../../../redux/visibility/slice.js";
import DownloadPdfButtonModalCar from "../../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar.jsx";

export default function DayCarsModal({ onClose, isModal }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);
  const carsData = useSelector(selectDayCars);
  const periodCars = useSelector(selectPeriodCars);
  const [viewMode, setViewMode] = useState("grid");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredCarsData, setFilteredCarsData] = useState([]);
  const [sortDescending, setSortDescending] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");

  const isFilter = true; // для коректного відображенення "Нові"-"Нова"

  const [periodStartData, setPeriodStartData] = useState(
    startDate || selectedDate || null
  );
  const [periodEndData, setPeriodEndData] = useState(
    endDate || startDate || selectedDate || null
  );

  useEffect(() => {
    console.log("carsData", carsData);
    console.log("periodCars", periodCars);
  }, [carsData, periodCars]);

  useEffect(() => {
    if (!startDate) {
      setPeriodStartData(selectedDate);
    }
    if (!endDate) {
      setPeriodEndData(selectedDate);
    }
  }, [startDate, endDate, selectedDate]);

  const fetchPeriodCars = (dates) => {
    const { startDate, endDate } = dates;

    if (!startDate || !endDate) {
      toast.error("Потрібно обрати обидві дати!");
      return;
    }

    dispatch(getPeriodCars(dates));
  };

  function formatToDate(date) {
    if (!date || !(date instanceof Date)) {
      console.error("Invalid date passed to formatToDate:", date);
      return null;
    }
    return date ? date.toISOString().split("T")[0] : null;
  }

  function handleInputChangeBeg(date) {
    let newStartDate = date;
    if (periodEndData && date && new Date(date) > new Date(periodEndData)) {
      newStartDate = periodEndData;
      toast.error("Кінцева дата не має перевищувати початкову!");
    }

    setPeriodStartData(newStartDate);
    setStartDate(newStartDate);

    if (newStartDate && periodEndData) {
      fetchPeriodCars({
        startDate: formatToDate(new Date(newStartDate)),
        endDate: formatToDate(new Date(periodEndData)),
      });
    }
  }

  function handleInputChangeEnd(date) {
    let newEndDate = date;
    if (periodStartData && date && new Date(date) < new Date(periodStartData)) {
      newEndDate = periodStartData;
    }

    setPeriodEndData(newEndDate);
    setEndDate(newEndDate);

    if (periodStartData && newEndDate) {
      fetchPeriodCars({
        startDate: formatToDate(new Date(periodStartData)),
        endDate: formatToDate(new Date(newEndDate)),
      });
    }
  }

  useEffect(() => {
    let filteredData = startDate ? [...periodCars] : [...carsData];

    // Сортування за тривалістю (часом)
    filteredData.sort((a, b) => {
      const currentDate = Date.now();
    
      const durationA = currentDate - new Date(a.date_s);
      const durationB = currentDate - new Date(b.date_s);
    
      return sortDescending ? durationB - durationA : durationA - durationB;
    });

    // Фільтрація по статусу
    if (selectedStatus !== "all") {
      filteredData = filteredData.filter(
        (car) => car.status === selectedStatus
      );
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

    // Фільтрація по пошуку
    if (searchTerm) {
      filteredData = filterCarsBySearchTerm(filteredData, searchTerm);
    }

    setFilteredCarsData(filteredData);
  }, [
    periodCars,
    carsData,
    selectedStatus,
    startDate,
    endDate,
    sortDescending,
    searchTerm,
  ]);

  const handleStatusChange = (status) => setSelectedStatus(status);
  
  const handleSearch = (term) => {
    validateSearchTerm(term, setInputError, setSearchTerm);
  };

  const filteredCars = () => {
    return filterCarsBySearchTerm(filteredCarsData, searchTerm);
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
              onChange={() =>
                setViewMode(viewMode === "grid" ? "list" : "grid")
              }
            />
            <span className={styles.slider}></span>
          </label>
          <div className={styles.search}>
            <CarsSearch
              value={searchTerm}
              onChange={handleSearch}
              error={inputError}
            />
          </div>
          <TimeSortItem onSortChange={setSortDescending} />
        </div>
        <div className={styles.rightHeader}>
          <StatusFilter
            onStatusChange={handleStatusChange}
            renderStatus={renderStatusCars}
            statuses={statusesCar}
            isFilter={isFilter}
          />
          <CalendarPeriodSelector
            periodStartData={periodStartData}
            periodEndData={periodEndData}
            startDate={startDate}
            endDate={endDate}
            handleInputChangeBeg={handleInputChangeBeg}
            handleInputChangeEnd={handleInputChangeEnd}
            isSingle={false}
          />
          <DownloadPdfButtonModalCar carsData={filteredCars()} />
          <InfoSettingsVisibility
          selectVisibility={selectVisibilityCar}
          toggleVisibilityAction={toggleVisibilityCar}
          labelNames={labelNamesInModal}
        />
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose className={styles.iconClose} />
      </button>
      {isLoading ? (
        <Loader />
      ) : filteredCarsData.length === 0 ? (
        <div className={styles.noResultsMessage}>
          По вашому запиту нічого не знайдено
        </div>
      ) : (
        <DayCarsList
          carsData={filteredCarsData}
          viewMode={viewMode}
          isModal={isModal}
        />
      )}
    </div>
  );
}
