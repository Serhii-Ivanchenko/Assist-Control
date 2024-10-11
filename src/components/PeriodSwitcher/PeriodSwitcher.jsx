import clsx from "clsx";
import css from "./PeriodSwitcher.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getCarsByDate, getCarsByMonth } from "../../redux/cars/operations";
export default function PeriodSwitcher({ changeCarsArr }) {
  const day = useRef();
  const month = useRef();
  const today = new Date().toISOString().split("T")[0];
  const activeClassName = clsx(css.statsBtn, css.activeBtn);
  const noneActiveClassName = clsx(css.statsBtn);

  const dispatch = useDispatch();
  const handleChoseDay = async () => {
    if (day.current.className === activeClassName) return;
    const { payload } = await dispatch(getCarsByDate(today));

    changeCarsArr(payload.cars);
    month.current.className = noneActiveClassName;
    day.current.className = activeClassName;
  };
  const handleChoseMonth = async () => {
    if (month.current.className === activeClassName) return;
    const { payload } = await dispatch(
      getCarsByMonth(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)
    );
    changeCarsArr(payload.cars);
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
