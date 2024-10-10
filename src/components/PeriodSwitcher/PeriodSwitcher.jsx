import clsx from "clsx";
import css from "./PeriodSwitcher.module.css";
import { useRef } from "react";
export default function PeriodSwitcher() {
  const day = useRef();
  const month = useRef();
  let dayClassName = clsx(css.statsBtn, css.activeBtn);
  let monthClassName = clsx(css.statsBtn);

  const handleChoseDay = () => {
    month.current.className = clsx(css.statsBtn);
    day.current.className = clsx(css.statsBtn, css.activeBtn);
  };
  const handleChoseMonth = () => {
    day.current.className = clsx(css.statsBtn);
    month.current.className = clsx(css.statsBtn, css.activeBtn);
  };
  return (
    <div className={css.btnCont}>
      <p>
        <button
          ref={day}
          type="button"
          className={dayClassName}
          onClick={handleChoseDay}
        >
          День
        </button>
        {" | "}
        <button
          ref={month}
          type="button"
          className={monthClassName}
          onClick={handleChoseMonth}
        >
          Місяць
        </button>
      </p>
    </div>
  );
}
