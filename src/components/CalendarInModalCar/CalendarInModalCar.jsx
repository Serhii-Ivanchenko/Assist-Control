import { useState } from "react";
import css from "./CalendarInModalCar.module.css";
import DatePicker from "react-datepicker";
import { BsCalendar2Week } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarInModalCar({ startDate, endDate, onDateBegChange, onDateEndChange }) {
  const [periodStartData, setPeriodStartData] = useState(startDate || null);  // Початкове значення null
  const [periodEndData, setPeriodEndData] = useState(endDate || null);  // Початкове значення null
  const [isOpenBeg, setIsOpenBeg] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

  function handleInputChangeBeg(date) {
    setPeriodStartData(date);
    onDateBegChange(date);
  }

  function handleInputChangeEnd(date) {
    setPeriodEndData(date);
    onDateEndChange(date);
  }

  const handleIconClickBeg = () => setIsOpenBeg((prev) => !prev);
  const handleIconClickEnd = () => setIsOpenEnd((prev) => !prev);

  return (
    <div className={css.containerperiodselector}>
      <p className={css.periodtitle}>З</p>
      <div className={css.datewrapper}>
        <DatePicker
          className={css.periodinput}
          selected={periodStartData}
          onChange={(date) => {
            handleInputChangeBeg(date);
            setIsOpenBeg(false);
          }}
          dateFormat="dd/MM/yyyy"
          open={isOpenBeg}
          onClickOutside={() => setIsOpenBeg(false)}
          popperClassName={css.leftdatepickerdropdown}
          onKeyDown={(e) => e.preventDefault()}
        />
        <button className={css.calendarBtn}>
          <BsCalendar2Week className={css.icon} onClick={handleIconClickBeg} />
        </button>
      </div>
      
      <p className={css.periodtitle}>По</p>
      <div className={css.datewrapper}>
        <DatePicker
          className={css.periodinput}
          selected={periodEndData}
          onChange={(date) => {
            handleInputChangeEnd(date);
            setIsOpenEnd(false);
          }}
          dateFormat="dd/MM/yyyy"
          open={isOpenEnd}
          onClickOutside={() => setIsOpenEnd(false)}
          popperClassName={css.datepickerdropdown}
          onKeyDown={(e) => e.preventDefault()}
        />
        <button className={css.calendarBtn}>
          <BsCalendar2Week className={css.icon} onClick={handleIconClickEnd} />
        </button>
      </div>
    </div>
  );
}
