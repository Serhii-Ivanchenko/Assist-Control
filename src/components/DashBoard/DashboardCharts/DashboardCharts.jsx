import ClientsDynamicsChart from "./ClientsDynamicsChart/ClientsDynamicsChart.jsx";
import LtvChart from "./LtvChart/LtvChart.jsx";
import CacLtvChart from "./CacLtvChart/CacLtvChart.jsx";
import RetentionChart from "./RetentionChart/RetentionChart.jsx";
import css from "./DashboardCharts.module.css";

export default function DashboardCharts() {
  return <div className={css.wrapper}>
    
    
     <div className={css.pagegrid}>
        <LtvChart />
        <CacLtvChart />
        <RetentionChart />
        <ClientsDynamicsChart />
    </div>
  </div>;
}
