import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDate,
  selectDayCars,
  selectLoading,
  selectVisibilityCar,
} from "../../../redux/cars/selectors";
import styles from "./DayCarsModal.module.css";
import DayCarsFilter from "../../DayCarsFilter/DayCarsFilter";
import { FiGrid } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DayCarsList from "../../DayCarsList/DayCarsList";
import Loader from "../../Loader/Loader";
import CalendarPeriodSelector from "../../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import StatusFilterCars from "../../StatusFilterCars/StatusFilterCars";
import { toggleVisibilityCar } from "../../../redux/cars/slice";
import CarInfoSettings from "../../sharedComponents/CarInfoSettings/CarInfoSettings";
import TimeSortCarItem from "../../sharedComponents/TimeSortCarItem/TimeSortCarItem";
import DownloadPdfButton from "../../sharedComponents/DownloadPdfButton/DownloadPdfButton";
import { getPeriodCars } from "../../../redux/cars/operations";
import toast from "react-hot-toast";

export default function DayCarsModal({ onClose, isModal }) {
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
  const [filteredCarsData, setFilteredCarsData] = useState([]);
  const [sortDescending, setSortDescending] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [periodStartData, setPeriodStartData] = useState(
    startDate || selectedDate || null
  );
  const [periodEndData, setPeriodEndData] = useState(
    endDate || startDate || selectedDate || null
  );

  useEffect(() => {
    if (!startDate) {
      setPeriodStartData(selectedDate);
    }
    if (!endDate) {
      setPeriodEndData(selectedDate);
    }
  }, [startDate, endDate, selectedDate]);

  const fetchPeriodCars = (dates) => {
    dispatch(getPeriodCars(dates));
  };

  function handleInputChangeBeg(date) {
    let newStartDate = date;
    if (periodEndData && date && new Date(date) > new Date(periodEndData)) {
      newStartDate = periodEndData;
      toast.error("Кінцева дата не має перевищувати початкову!");
    }

    setPeriodStartData(newStartDate);
    setStartDate(newStartDate);

    if (newStartDate && periodEndData) {
      fetchPeriodCars({ startDate: newStartDate, endDate: periodEndData });
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
      fetchPeriodCars({ startDate: periodStartData, endDate: newEndDate });
    }
  }

  // Початкове встановлення дат і завантаження даних
  // useEffect(() => {
  //   if (selectedDate) {
  //     setStartDate(selectedDate);
  //     setEndDate(selectedDate);
  //     dispatch(getPeriodCars({ startDate: selectedDate, endDate: selectedDate }));
  //   }
  // }, [dispatch, selectedDate]);

  // Оновлення списку при зміні дат
  // useEffect(() => {
  //   if (startDate && endDate) {
  //     dispatch(getPeriodCars({ startDate, endDate }));
  //   }
  // }, [dispatch, startDate, endDate]);

 

  // Фільтрація даних
  useEffect(() => {
    let filteredData = [...carsData];

    const getDurationInMillis = (startDate, completeDate) => {
      const start = new Date(startDate);
      const end = completeDate ? new Date(completeDate) : new Date();
      return end - start;
    };

    filteredData.sort((a, b) => {
      const durationA = getDurationInMillis(a.date_s, a.complete_d);
      const durationB = getDurationInMillis(b.date_s, b.complete_d);
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

    setFilteredCarsData(filteredData);
  }, [selectedStatus, startDate, endDate, carsData, sortDescending]);

  const handleStatusChange = (status) => setSelectedStatus(status);

  const handleSearch = (term) => {
    if (/^[a-zA-Z0-9]*$/.test(term)) {
      setSearchTerm(term);
      setInputError("");
    } else {
      setInputError("Вводьте лише латинські літери та цифри");
    }
  };

  const handleToggle = (field) => {
    const newVisibility = { ...visibility, [field]: !visibility[field] };
    dispatch(toggleVisibilityCar(newVisibility));
  };

  const filteredCars = () => {
    if (!searchTerm) return filteredCarsData;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return filteredCarsData.filter((car) => {
      const { plate, auto } = car;
      const plateValue = plate ? plate.toLowerCase() : "";
      const autoValue = auto ? auto.toLowerCase() : "";

      return (
        plateValue.includes(lowerCaseSearchTerm) ||
        autoValue.includes(lowerCaseSearchTerm)
      );
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
              onChange={() =>
                setViewMode(viewMode === "grid" ? "list" : "grid")
              }
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
        </div>
        <div className={styles.rightHeader}>
          <StatusFilterCars onStatusChange={handleStatusChange} />
          <CalendarPeriodSelector
            periodStartData={periodStartData}
            periodEndData={periodEndData}
            startDate={startDate}
            endDate={endDate}
            // onDateBegChange={setStartDate}
            // onDateEndChange={setEndDate}
            handleInputChangeBeg={handleInputChangeBeg}
            handleInputChangeEnd={handleInputChangeEnd}
          />
          <TimeSortCarItem onSortChange={setSortDescending} />
          <DownloadPdfButton carsData={filteredCars()} />
          <CarInfoSettings isCrmView={false} handleToggle={handleToggle} />
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose className={styles.iconClose} />
      </button>
      {!isLoading && filteredCarsData.length > 0 ? (
        <DayCarsList
          carsData={filteredCars()}
          viewMode={viewMode}
          isModal={isModal}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
