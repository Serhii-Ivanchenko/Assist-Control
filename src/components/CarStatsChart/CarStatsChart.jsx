import css from "./CarStatsChart.module.css";
import Chart from "../Chart/Chart.jsx";

export default function CarStatsChart() {
  return (
    <div className={css.containerStats}>
      <Chart />
    </div>
  );
}
