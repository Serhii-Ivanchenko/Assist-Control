import css from "./DiagnosticsInfo.module.css";
import { BsWrench } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";

export default function DiagnosticsInfo({
  time,
  mechName,
  createdAt,
  managerName,
  arrival,
  leaving,
}) {
  return (
    <div className={css.wrapper}>
      <p className={css.date}>{createdAt}</p>
      <div className={css.infoBox}>
        <div className={css.infoKey}>
          <BsWrench className={css.icon} size={18} />
          <p className={css.key}>Механік:</p>
        </div>
        <p className={css.infoName}>{mechName}</p>
      </div>

      <div className={css.infoBox}>
        <div className={css.infoKey}>
          <BsPersonLinesFill className={css.icon} size={18} />
          <p className={css.key}>Менеджер:</p>
        </div>
        <p className={css.infoName}>{managerName}</p>
      </div>
      <div className={css.arrivalBox}>
        <div className={css.arrival}>
          <p className={css.arKey}>Заїзд</p>
          <p className={css.time}>{arrival || "-- : --"}</p>
        </div>
        <div className={css.arrival}>
          <p className={css.arKey}>Виїзд</p>
          <p className={css.time}>{leaving || "-- : --"}</p>
        </div>
      </div>
      <p className={css.minutes}>
        <span className={css.minutesTime}>{time || "--"}</span>хв
      </p>
    </div>
  );
}
