import css from "./PeriodSwitcher.module.css";
export default function PeriodSwitcher() {
  return (
    <div className={css.btnCont}>
      <p>
        <button type="button" className={css.statsBtn}>
          День
        </button>
        {" | "}
        <button type="button" className={css.statsBtn}>
          Місяць
        </button>
      </p>
    </div>
  );
}
