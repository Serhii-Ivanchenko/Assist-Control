import { BsCalendar2Week } from "react-icons/bs";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CalendarPeriodSelector.module.css";
import { useState } from "react";
export default function CalendarPeriodSelector({
  renderInModal,
  handleInputChangeBeg,
  handleInputChangeEnd,
  periodStartData,
  periodEndData,
  isSingle = false,
}) {
  const [isOpenBeg, setIsOpenBeg] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

  const handleIconClickBeg = () => setIsOpenBeg((prev) => !prev);
  const handleIconClickEnd = () => setIsOpenEnd((prev) => !prev);

  const handleDateChange = (date) => {
    // Якщо один календар, викликаємо тільки handleInputChangeBeg
    if (isSingle) {
      handleInputChangeBeg(date);
      setIsOpenBeg(false);
    } else {
      // Якщо два календарі, обробляємо відповідно
      handleInputChangeBeg(date);
      setIsOpenBeg(false);
    }
  };

  return (
    <div className={css.calendarContainer}>
      <p className={css.periodTitle}>З</p>
      <div
        className={clsx(css.dateWrapper, {
          [css.dateWrapperModal]: renderInModal,
        })}
      >
        <DatePicker
          className={css.periodInput}
          selected={periodStartData}
          onChange={(date) => handleDateChange(date)}  // Викликаємо універсальний метод
          dateFormat="dd/MM/yyyy"
          open={isOpenBeg}
          onClickOutside={() => setIsOpenBeg(false)}
          popperClassName={css.leftdatePickerDropdown}
        />
        <div className={css.calendarBtn}>
          <BsCalendar2Week className={css.icon} onClick={handleIconClickBeg} />
        </div>
      </div>

      {!isSingle && (
        <>
          <p className={css.periodTitle}>По</p>
          <div
            className={clsx(css.dateWrapper, {
              [css.dateWrapperModal]: renderInModal,
            })}
          >
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
            />
            <div className={css.calendarBtn}>
              <BsCalendar2Week className={css.icon} onClick={handleIconClickEnd} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

