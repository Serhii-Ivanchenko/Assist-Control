import { forwardRef, useEffect, useState } from "react";
import css from "../SelectDate/SelectDate.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Week } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { format, addDays, subDays } from "date-fns";
import { useSelector } from "react-redux";
import { selectDate } from "../../../../redux/cars/selectors";

export default function SelectDate({ newDate, recordId, carSelectDate }) {
  const selectedDate = useSelector(selectDate);
  const [startDate, setStartDate] = useState(
    recordId || carSelectDate ? new Date(selectedDate) : new Date()
  );

  useEffect(() => {
    newDate(startDate.toLocaleDateString());
  }, [newDate, startDate]);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={css.datePickerWrapper}>
      <button
        type="button"
        className={css.datePaginationBtn}
        onClick={() => {
          setStartDate(subDays(value, 1));
        }}
        disabled={new Date(value) <= new Date()}
      >
        <BsChevronLeft className={css.btnIcon} />
      </button>
      <div className={css.dateWrapper}>
        <button
          type="button"
          className={css.customInput}
          onClick={onClick}
          ref={ref}
        >
          <BsCalendar2Week />
        </button>
        <p>{format(value, "dd.MM.yyyy")}</p>
      </div>
      <button
        type="button"
        className={css.datePaginationBtn}
        onClick={() => setStartDate(addDays(value, 1))}
      >
        <BsChevronRight className={css.btnIcon} />
      </button>
    </div>
  ));

  CustomInput.displayName = "CustomInput";

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        customInput={<CustomInput />}
      />
    </>
  );
}
