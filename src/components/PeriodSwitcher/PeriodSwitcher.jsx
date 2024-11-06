import clsx from "clsx";
import css from "./PeriodSwitcher.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, selectDayCars } from "../../redux/cars/selectors";
import { useEffect } from "react";
import { getCarsByMonth } from "../../redux/cars/operations";
import { useState } from "react";

export default function PeriodSwitcher({ changeCarsArr }) {
  const [daySelected, setDaySelected] = useState(false);

  const day = useRef();
  const month = useRef();

  const activeClassName = clsx(css.statsBtn, css.activeBtn);
  const noneActiveClassName = clsx(css.statsBtn);

  const dayCars = useSelector(selectDayCars);
  const date = useSelector(selectDate) || "";
  const selectedMonth = `${date.split("-")[0]}-${date.split("-")[1]}`;

  const dispatch = useDispatch();

  useEffect(() => {
    changeCarsArr(dayCars);
    handleChoseDay();
  }, [date, dayCars]);

  const handleChoseDay = () => {
    if (!daySelected || date !== new Date().toISOString().split("T")[0]) {
      month.current.className = noneActiveClassName;
      day.current.className = activeClassName;
      changeCarsArr(dayCars);
      setDaySelected(true);
    }
  };

  const handleChoseMonth = async () => {
    if (month.current.className === activeClassName) return;
    const { payload } = await dispatch(getCarsByMonth(selectedMonth));
    changeCarsArr(payload.cars);
    setDaySelected(false);
    day.current.className = noneActiveClassName;
    month.current.className = activeClassName;
  };

  return (
    <div className={css.btnCont}>
      <p>
        <button
          ref={day}
          type="button"
          className={activeClassName}
          onClick={handleChoseDay}
        >
          День
        </button>
        {" | "}
        <button
          ref={month}
          type="button"
          className={noneActiveClassName}
          onClick={handleChoseMonth}
        >
          Місяць
        </button>
      </p>
    </div>
  );
}
