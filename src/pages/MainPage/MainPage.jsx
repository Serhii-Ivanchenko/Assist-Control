import DashboardCharts from "../../components/DashBoard/DashboardCharts/DashboardCharts.jsx";
import DashBoardControlBar from "../../components/DashBoard/DashBoardControlBar/DashBoardControlBar.jsx";
import DashboardLeftSide from "../../components/DashBoard/DashboardLeftSide/DashboardLeftSide.jsx";
import DashboardRightSide from "../../components/DashBoard/DashboardRightSide/DashboardRightSide.jsx";
import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={css.contentContainer}>
      <DashBoardControlBar />
      <div className={css.mainContent}>
        <DashboardLeftSide />

        <div className={css.rightSide}>
          <DashboardRightSide />
          <DashboardCharts />
        </div>
      </div>
    </div>
  );
}
