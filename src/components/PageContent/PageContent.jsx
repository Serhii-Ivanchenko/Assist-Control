import CarStatsChart from "../CarStatsChart/CarStatsChart";
import LoadStatsChart from "../LoadStatsChart/LoadStatsChart";
import CurrentCarsList from '../CurrentCarsList/CurrentCarsList.jsx'
import Statistics from "../Statistics/Statistics";
import VideoFrame from "../VideoFrame/VideoFrame";
import CurrentCarsList from "../CurrentCarsList/CurrentCarsList";
import css from "./PageContent.module.css";
export default function PageContent() {
  return (
    <div className={css.pageContent}>
      <Statistics />
      <div className={css.pagegrid}>
        <VideoFrame />
        <CarStatsChart />
        <CurrentCarsList />
        <LoadStatsChart />
      </div>
    </div>
  );
}
