import { forwardRef } from "react";
import css from "../SelectDate/SelectDate.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Week } from "react-icons/bs";

export default function SelectDate({ newDate }) {
  const CustomInput = forwardRef(({ onClick }, ref) => (
    <button className={css.customInput} onClick={onClick} ref={ref}>
      <BsCalendar2Week />
      Обрати дату
    </button>
  ));

  CustomInput.displayName = "CustomInput";

  return (
    <div className={css.wrapper}>
      <DatePicker
        selected={Date.now()}
        onChange={(date) => newDate(date.toLocaleDateString())}
        minDate={new Date()}
        customInput={<CustomInput />}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
