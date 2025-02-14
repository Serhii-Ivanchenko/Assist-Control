import css from "./DiagnosticsInfo.module.css";
import { BsWrench } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";

export default function DiagnosticsInfo() {
  return (
    <div className={css.wrapper}>
      <p className={css.date}>03.02.2025</p>
      <div className={css.infoBox}>
        <div className={css.infoKey}>
          <BsWrench className={css.icon} size={18} />
          <p className={css.key}>Механік:</p>
        </div>
        <p className={css.infoName}>Шевченко А.В.</p>
      </div>

      <div className={css.infoBox}>
        <div className={css.infoKey}>
          <BsPersonLinesFill className={css.icon} size={18} />
          <p className={css.key}>Менеджер:</p>
        </div>
        <p className={css.infoName}>Олег А.В.</p>
      </div>
      <div className={css.arrivalBox}>
        <div className={css.arrival}>
          <p className={css.arKey}>Заїзд</p>
          <p className={css.time}>--:--</p>
        </div>
        <div className={css.arrival}>
          <p className={css.arKey}>Виїзд</p>
          <p className={css.time}>--:--</p>
        </div>
      </div>
      <p className={css.minutes}>
        <span className={css.minutesTime}>--</span>хв
      </p>
    </div>
  );
}
