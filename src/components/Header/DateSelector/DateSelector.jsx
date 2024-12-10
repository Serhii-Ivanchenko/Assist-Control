import { useDispatch } from "react-redux";
import CalendarPeriodSelector from "../../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import css from "./DateSelector.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectDate } from "../../../redux/cars/selectors.js";
import { getRecordsForPeriod } from "../../../redux/crm/operations.js";
import toast from "react-hot-toast";
import { selectPeriodRecords } from "../../../redux/crm/selectors.js";

export default function DateSelector() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [periodStartData, setPeriodStartData] = useState();
    const [periodEndData, setPeriodEndData] = useState();
    const currentDate = new Date().toISOString().split("T")[0];

  const periodRecords = useSelector(selectPeriodRecords);
    console.log("periodRecords", periodRecords);

  useEffect(() => {
    if (!startDate) {
      setPeriodStartData(currentDate);
    }
    if (!endDate) {
      setPeriodEndData(currentDate);
    }
  }, [startDate, endDate, currentDate]);

  const fetchPeriodRecords = (dates) => {
    const { startDate, endDate } = dates;

    if (!startDate || !endDate) {
      toast.error("Обидві дати повинні бути вибрані!");
      return;
    }

    dispatch(getRecordsForPeriod(dates));
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
    console.log("newStartDate", newStartDate);

    if (newStartDate && periodEndData) {
      fetchPeriodRecords({
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
    console.log("periodStartData", periodStartData);

    if (periodStartData && newEndDate) {
      fetchPeriodRecords({
        startDate: formatToDate(new Date(periodStartData)),
        endDate: formatToDate(new Date(newEndDate)),
      });
    }
  }

  return (
    <div className={css.container}>
      <CalendarPeriodSelector
        periodStartData={periodStartData}
        periodEndData={periodEndData}
        startDate={startDate}
        endDate={endDate}
        handleInputChangeBeg={handleInputChangeBeg}
        handleInputChangeEnd={handleInputChangeEnd}
      />
    </div>
  );
}
