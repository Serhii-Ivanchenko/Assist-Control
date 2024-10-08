import { useState } from "react";
import dayjs from "dayjs";
import css from "./PeriodSelector.module.css";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
export default function PeriodSelector({
  startDate,
  endDate,
  onDateBegChange,
  onDateEndChange,
}) {
  const [periodStartData, setPeriodStartData] = useState(startDate);
  const [periodEndData, setPeriodEndData] = useState(endDate);
  const [isOpenBeg, setIsOpenBeg] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  //   console.log('sd',startDate);
  // console.log('psd',periodStartData);
  // console.log('ed',endDate);
  //   console.log('ped',periodEndData);

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
    if (
      dateNewEnd.$d.toISOString().substring(0, 10) >
      currentDate.toISOString().substring(0, 10)
    ) {
      setPeriodEndData(currentDate);
      onDateEndChange(currentDate);
    } else {
      setPeriodEndData(dateNewEnd.$d);
      onDateEndChange(dateNewEnd.$d);
    }
    return;
  }

  const handleIconClickBeg = () => {
    setIsOpenBeg((prev) => !prev); // Переключение состояния открытия календаря
  };
  const handleIconClickEnd = () => {
    setIsOpenEnd((prev) => !prev); // Переключение состояния открытия календаря
  };

  return (
    <div className={css.containerperiodselector}>
      <p className={css.periodtitle}>З</p>

      <div className={css.datewrapper}>
        <DatePicker
          className={css.periodinput}
          selected={periodStartData}
          onChange={(date) => handleInputChangeBeg(date)}
          dateFormat="dd/MM/yyyy"
          open={isOpenBeg}
          onClickOutside={() => setIsOpenBeg(false)}

          //  placeholderText="Click to select a date"
        />
        <FaCalendar className={css.icon} onClick={handleIconClickBeg} />
      </div>
      <p className={css.periodtitle}>По</p>

      <div className={css.datewrapper}>
        <DatePicker
          className={css.periodinput}
          selected={periodEndData}
          onChange={(date) => handleInputChangeEnd(date)}
          dateFormat="dd/MM/yyyy"
          open={isOpenEnd}
          onClickOutside={() => setIsOpenEnd(false)}
          //  placeholderText="Click to select a date"
        />
        <FaCalendar className={css.icon} onClick={handleIconClickEnd} />
      </div>
    </div>
  );

  // return (
  //     <div className={css.containerperiodselector}>
  //         <p className={css.periodtitle}>З</p>
  //         <input type="date" name="datebegin" className={css.periodInput}
  //             value={periodStartData}
  //             onChange={handleInputChangeBeg} />
  //         <p className={css.periodtitle}>По</p>
  //         <input type="date" name="dateend" className={css.periodInput}
  //             value={periodEndData}
  //             onChange={handleInputChangeEnd} />
  //     </div>

  // );
}
