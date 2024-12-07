import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDate } from "../../../redux/cars/selectors";
import css from "./CalendarPeriodSelector.module.css";
import DatePicker from "react-datepicker";
import { BsCalendar2Week } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import { getPeriodCars } from "../../../redux/cars/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";
export default function CalendarPeriodSelector({
  startDate,
  endDate,
  onDateBegChange,
  onDateEndChange,
  renderInModal,
}) {
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  
  const [periodStartData, setPeriodStartData] = useState(startDate || selectedDate || null);
  const [periodEndData, setPeriodEndData] = useState(endDate || startDate || selectedDate || null);
  const [isOpenBeg, setIsOpenBeg] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

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
    onDateBegChange(newStartDate);

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
    onDateEndChange(newEndDate);

    if (periodStartData && newEndDate) {
      fetchPeriodCars({ startDate: periodStartData, endDate: newEndDate });
    }
  }

  const handleIconClickBeg = () => setIsOpenBeg((prev) => !prev);
  const handleIconClickEnd = () => setIsOpenEnd((prev) => !prev);

  return (
    <div className={css.calendarContainer}>
      <p className={css.periodTitle}>З</p>
      <div className={clsx(css.dateWrapper, { 
        [css.dateWrapperModal]: renderInModal, 
        [css.dateWrapperSection]: !renderInModal 
      })}>
        <DatePicker
          className={css.periodInput}
          selected={periodStartData}
          onChange={(date) => {
            handleInputChangeBeg(date);
            setIsOpenBeg(false);
          }}
          dateFormat="dd/MM/yyyy"
          open={isOpenBeg}
          onClickOutside={() => setIsOpenBeg(false)}
          popperClassName={css.leftdatePickerDropdown}
          onKeyDown={(e) => e.preventDefault()}
        />
        <div className={css.calendarBtn}>
          <BsCalendar2Week className={css.icon} onClick={handleIconClickBeg} />
        </div>
      </div>

      <p className={css.periodTitle}>По</p>
      <div className={clsx(css.dateWrapper, { 
        [css.dateWrapperModal]: renderInModal, 
        [css.dateWrapperSection]: !renderInModal 
      })}>
        <DatePicker
          className={css.periodInput}
          selected={periodEndData}
          onChange={(date) => {
            handleInputChangeEnd(date);
            setIsOpenEnd(false);
          }}
          dateFormat="dd/MM/yyyy"
          open={isOpenEnd}
          onClickOutside={() => setIsOpenEnd(false)}
          popperClassName={css.datePickerDropdown}
          onKeyDown={(e) => e.preventDefault()}
        />
        <div className={css.calendarBtn}>
          <BsCalendar2Week className={css.icon} onClick={handleIconClickEnd} />
        </div>
      </div>
    </div>
  );
}
