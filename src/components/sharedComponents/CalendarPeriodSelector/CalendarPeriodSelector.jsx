import { BsCalendar2Week } from "react-icons/bs";
import { MdClose } from "react-icons/md";  // Для хрестика
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
  const [isDateSelectedBeg, setIsDateSelectedBeg] = useState(false); // Стан для визначення, чи вибрана дата

  const handleIconClickBeg = () => setIsOpenBeg((prev) => !prev);
  const handleIconClickEnd = () => setIsOpenEnd((prev) => !prev);

  const handleDateChange = (date) => {
    if (isSingle) {
      handleInputChangeBeg(date);
      setIsDateSelectedBeg(true);  // Якщо дата вибрана, хрестик з'являється
      setIsOpenBeg(false);
    } else {
      handleInputChangeBeg(date);
      setIsOpenBeg(false);
    }
  };

  // Функція для скидання дати
  const handleResetDateBeg = () => {
    handleInputChangeBeg(null);
    setIsDateSelectedBeg(false);  // Хрестик приховується
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
          onChange={(date) => handleDateChange(date)}
          dateFormat="dd/MM/yyyy"
          open={isOpenBeg}
          onClickOutside={() => setIsOpenBeg(false)}
          popperClassName={css.leftdatePickerDropdown}
        />
        <div className={css.calendarBtn}>{isDateSelectedBeg && (
            <MdClose
              className={css.iconClose} 
              size={15}
              onClick={handleResetDateBeg}
            />
          )}
          <BsCalendar2Week size={14} className={css.icon} onClick={handleIconClickBeg} />
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
