import { useState } from "react";
import dayjs from "dayjs";
import css from "./PeriodSelector.module.css";
// import DatePicker from "react-datepicker";
// import { BsCalendar2Week } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";

export default function PeriodSelector({
  startDate,
  endDate,
  onDateBegChange,
  onDateEndChange,
}) {
  const [periodStartData, setPeriodStartData] = useState(startDate);
  const [periodEndData, setPeriodEndData] = useState(endDate);
  // const [isOpenBeg, setIsOpenBeg] = useState(false);
  // const [isOpenEnd, setIsOpenEnd] = useState(false);
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  function handleInputChangeBeg(e) {
    //  const value = e.target.value;
    let dateNewBeg = dayjs(e);
    let dateNewEnd = dayjs(periodEndData);
    if (
      e.toISOString().substring(0, 10) >
      sevenDaysAgo.toISOString().substring(0, 10)
    ) {
      setPeriodStartData(sevenDaysAgo);
      onDateBegChange(sevenDaysAgo);
      setPeriodEndData(currentDate);
      onDateEndChange(currentDate);
    } else {
      if (dateNewEnd.diff(dateNewBeg, "month", true) > 1) {
        dateNewEnd = dateNewBeg.add(1, "month");
        setPeriodEndData(dateNewEnd.$d);
        onDateEndChange(dateNewEnd.$d);
      }
      if (dateNewEnd.diff(dateNewBeg, "day", true) < 7) {
        dateNewEnd = dateNewBeg.add(7, "day");
        setPeriodEndData(dateNewEnd.$d);
        onDateEndChange(dateNewEnd.$d);
      }
      setPeriodStartData(e);
      onDateBegChange(e);
    }
  }

  function handleInputChangeEnd(e) {
    // const value = e.target.value;
    let dateNewBeg = dayjs(periodStartData);
    let dateNewEnd = dayjs(e);

    if (dateNewEnd.diff(dateNewBeg, "month", true) > 1) {
      dateNewEnd = dateNewBeg.add(1, "month");
    }

    if (dateNewEnd.diff(dateNewBeg, "day", true) < 7) {
      dateNewEnd = dateNewBeg.add(7, "day");
    }

    if (
      dateNewEnd.$d.toISOString().substring(0, 10) >
      currentDate.toISOString().substring(0, 10)
    ) {
      setPeriodEndData(currentDate);
      onDateEndChange(currentDate);
      return;
    }

    setPeriodEndData(dateNewEnd.$d);
    onDateEndChange(dateNewEnd.$d);

    return;
  }

  // const handleIconClickBeg = () => {
  //   setIsOpenBeg((prev) => !prev); // Переключение состояния открытия календаря
  // };
  // const handleIconClickEnd = () => {
  //   setIsOpenEnd((prev) => !prev); // Переключение состояния открытия календаря
  // };

  return (
    <div className={css.containerperiodselector}>
    <CalendarPeriodSelector
      periodStartData={periodStartData}
      periodEndData={periodEndData}
      startDate={startDate}
      endDate={endDate}
      // onDateBegChange={setStartDate}
      // onDateEndChange={setEndDate}
      handleInputChangeBeg={handleInputChangeBeg}
      handleInputChangeEnd={handleInputChangeEnd}
      isSingle={false}
    />
    </div>

    // <div className={css.containerperiodselector}>
    //   <p className={css.periodtitle}>З</p>

    //   <div className={css.datewrapper}>
    //     <DatePicker
    //       className={css.periodinput}
    //       selected={periodStartData}
    //       onChange={(date) => {
    //         handleInputChangeBeg(date), setIsOpenBeg(false);
    //       }}
    //       dateFormat="dd/MM/yyyy"
    //       open={isOpenBeg}
    //       onClickOutside={() => setIsOpenBeg(false)}
    //       popperClassName={css.leftdatepickerdropdown}
    //       //  placeholderText="Click to select a date"
    //       onKeyDown={(e) => e.preventDefault()}
    //     />
    //     <button className={css.calendarBtn}>
    //       <BsCalendar2Week className={css.icon} onClick={handleIconClickBeg} />
    //     </button>
    //   </div>
    //   <p className={css.periodtitle}>По</p>

    //   <div className={css.datewrapper}>
    //     <DatePicker
    //       className={css.periodinput}
    //       selected={periodEndData}
    //       onChange={(date) => {
    //         handleInputChangeEnd(date), setIsOpenEnd(false);
    //       }}
    //       dateFormat="dd/MM/yyyy"
    //       open={isOpenEnd}
    //       onClickOutside={() => setIsOpenEnd(false)}
    //       popperClassName={css.datepickerdropdown}
    //       //  placeholderText="Click to select a date"
    //     />
    //     <button className={css.calendarBtn}>
    //       <BsCalendar2Week className={css.icon} onClick={handleIconClickEnd} />
    //     </button>
    //   </div>
    // </div>
  );
}
