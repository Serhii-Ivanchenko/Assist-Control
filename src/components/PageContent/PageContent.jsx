import CarStatsChart from "../CarStatsChart/CarStatsChart";
import LoadStatsChart from "../LoadStatsChart/LoadStatsChart";
import CurrentCarsList from "../CurrentCarsList/CurrentCarsList.jsx";
import Statistics from "../Statistics/Statistics";
import VideoFrame from "../VideoFrame/VideoFrame";
import css from "./PageContent.module.css";
import { useEffect } from "react";
import { getCarsByDate } from "../../redux/cars/operations.js";
import { useDispatch } from "react-redux";

export default function PageContent() {
  // const dispatch = useDispatch();
  // const today = new Date().toISOString().split("T")[0];
  // useEffect(() => {
  //   const initChecksCars = async () => await dispatch(getCarsByDate(today));
  //   initChecksCars();
  // });
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
