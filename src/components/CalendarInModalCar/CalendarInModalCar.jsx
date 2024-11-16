import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDate } from "../../redux/cars/selectors";
import css from "./CalendarInModalCar.module.css";
import DatePicker from "react-datepicker";
import { BsCalendar2Week } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarInModalCar({ startDate, endDate, onDateBegChange, onDateEndChange, onPeriodCarsFetch }) {
  const selectedDate = useSelector(selectDate);
  const [periodStartData, setPeriodStartData] = useState(startDate || selectedDate || null);
  const [periodEndData, setPeriodEndData] = useState(endDate || startDate || selectedDate || null);
  const [isOpenBeg, setIsOpenBeg] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

  useEffect(() => {
    if (startDate !== periodStartData) {
      setPeriodStartData(startDate || selectedDate); 
    }
  }, [startDate, periodStartData, selectedDate]);  

  useEffect(() => {
    if (endDate !== periodEndData) {
      setPeriodEndData(endDate || periodStartData);  
    }
  }, [endDate, periodEndData, periodStartData]);

  function handleInputChangeBeg(date) {
    setPeriodStartData(date);
    onDateBegChange(date);  
    if (date && periodEndData) {
      onPeriodCarsFetch({ startDate: date, endDate: periodEndData });
    }
  }

  function handleInputChangeEnd(date) {
    setPeriodEndData(date);
    onDateEndChange(date);
    if (periodStartData && date) {
      onPeriodCarsFetch({ startDate: periodStartData, endDate: date });
    }
  }

  const handleIconClickBeg = () => setIsOpenBeg((prev) => !prev);
  const handleIconClickEnd = () => setIsOpenEnd((prev) => !prev);

  return (
    <div className={css.calendarContainer}>
      <p className={css.periodTitle}>З</p>
      <div className={css.dateWrapper}>
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
      <div className={css.dateWrapper}>
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
