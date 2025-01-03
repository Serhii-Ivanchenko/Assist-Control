import { useDispatch } from "react-redux";
import CalendarPeriodSelector from "../../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import css from "./DateSelector.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { getRecordsForPeriod } from "../../../redux/crm/operations.js";
import toast from "react-hot-toast";
import { selectPeriodRecords } from "../../../redux/crm/selectors.js";
import { updateDates } from "../../../redux/crm/slice.js";

export default function DateSelector() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [periodStartData, setPeriodStartData] = useState();
  const [periodEndData, setPeriodEndData] = useState();
  const currentDate = new Date().toISOString().split("T")[0];

  const periodRecords = useSelector(selectPeriodRecords);
  console.log("periodRecords", periodRecords);

  const fetchPeriodRecords = useCallback(
    (dates) => {
      const { startDate, endDate } = dates;

      if (!startDate || !endDate) {
        toast.error("Потрібно обрати обидві дати!");
        return;
      }

      dispatch(getRecordsForPeriod(dates));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!startDate && !endDate) {
      setPeriodStartData(currentDate);
      setPeriodEndData(currentDate);
      setStartDate(currentDate);
      setEndDate(currentDate);
    }
  }, [startDate, endDate, currentDate]);

  useEffect(() => {
    if (startDate && endDate) {
      const updatedDates = {
        startDate: formatToDate(new Date(startDate)),
        endDate: formatToDate(new Date(endDate)),
      };
      fetchPeriodRecords(updatedDates);
      dispatch(updateDates(updatedDates));
    }
  }, [startDate, endDate, fetchPeriodRecords]);

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
      const updatedDates = {
        startDate: formatToDate(new Date(newStartDate)),
        endDate: formatToDate(new Date(periodEndData)),
      };
      fetchPeriodRecords(updatedDates);
      dispatch(updateDates(updatedDates));
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
      const updatedDates = {
        startDate: formatToDate(new Date(periodStartData)),
        endDate: formatToDate(new Date(newEndDate)),
      };
    console.log("updatedDates", updatedDates);

      fetchPeriodRecords(updatedDates);
      dispatch(updateDates(updatedDates));
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
        isSingle={false}
      />
    </div>
  );
}
