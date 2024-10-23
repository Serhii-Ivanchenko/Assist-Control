import { useState } from "react";
import PeriodSwitcher from "../PeriodSwitcher/PeriodSwitcher";
import StatsList from "../StatsList/StatsList";
import css from "./Statistics.module.css";

export default function Statistics() {
  const [cars, setCars] = useState([]);
  
  const changeCarsArr = (value) => setCars(value);
  return (
    <div className={css.statisticsCont}>
      <div className={css.statisticsTitle}>
        <h2 className={css.title}>Статистика</h2>
        <PeriodSwitcher changeCarsArr={changeCarsArr} />
      </div>
      <StatsList cars={cars} />
    </div>
  );
}
