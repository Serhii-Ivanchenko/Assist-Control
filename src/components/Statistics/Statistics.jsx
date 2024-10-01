import PeriodSwitcher from "../PeriodSwitcher/PeriodSwitcher";
import StatsList from "../StatsList/StatsList";
import css from "./Statistics.module.css"
export default function Statistics() {
  return (
    <div className={css.statisticsCont}>
      <div className={css.statisticsTitle}>
        <h2 className={css.title}>Статистика</h2>
        <PeriodSwitcher />
      </div>
      <StatsList />
    </div>
  );
}
