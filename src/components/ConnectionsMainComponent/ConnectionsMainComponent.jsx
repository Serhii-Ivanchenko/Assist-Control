import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsControlBarSection from "../ConnectionsControlBarSection/ConnectionsControlBarSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
import ProblemCall from "../ProblemCall/ProblemCall.jsx";
import css from "./ConnectionsMainComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getConnectionsList,
  getStats,
} from "../../redux/connections/operations.js";
import {
  selectConnectionsList,
  selectError,  selectStats 
} from "../../redux/connections/selectors.js";

export default function ConnectionsMainComponent() {
  const dispatch = useDispatch();
  const connectionsList = useSelector(selectConnectionsList);
  const error = useSelector(selectError);
  const selectStatsData = useSelector(selectStats);
  const errorStatus = error?.status;
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const monthAgo = new Date();
  monthAgo.setDate(today.getDate() - 30);

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState("day");
  useEffect(() => {
    const params = {
      page: 1,
    };

    if (selectedStatus && selectedStatus !== "ALL") {
      params.status = selectedStatus;
    }

    if (startDate) {
      params.start_date = startDate.toISOString().split("T")[0];
    }

    if (endDate) {
      params.end_date = endDate.toISOString().split("T")[0];
    }

    // console.log("Params sent to backend:", params);
    dispatch(getConnectionsList(params));
    dispatch(getStats(params));
  }, [dispatch, selectedStatus, startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleTimeRange = (value) => {
    setTimeFilter(value);
  setEndDate(today);
    switch (value) {
    case "day":
       setStartDate(today);
       break;
  case "week":
        setStartDate(sevenDaysAgo);
        break;
  case "month":
        setStartDate(monthAgo);
        break;
      case "all": 
        setStartDate(null);
        break;
      default:
        setStartDate(today);
    };
  }

  // Фільтрація за статусом
  const statusFilteredConnections = (connectionsList || []).filter(
    (item) =>
      selectedStatus === "ALL" ||
      item.status.toUpperCase() === selectedStatus.toUpperCase()
  );

 // Фільтрація за датою
const dateFilteredConnections = statusFilteredConnections.filter((item) => {
  const itemDate = new Date(item.created_at);
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Приводимо дати до початку дня
  itemDate.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return itemDate >= start && itemDate <= end;
});


  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection
        onStatusChange={setSelectedStatus}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSelectTimeRange={handleTimeRange}
        periodStartData={startDate}
        periodEndData={endDate}
        setPeriodStartData={handleStartDateChange}
        setPeriodEndData={handleEndDateChange}
      />
      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection statsData={selectStatsData } />
        <HorizontalPBSection />
      </div>
      <div className={css.bottomWrapper}>
        {errorStatus === 404 ? (
          <div className={css.noConnectionsMessage}>
            Не знайдено звернень за поточний період
          </div>
        ) : statusFilteredConnections.length === 0 ? (
          <div className={css.noConnectionsMessage}>
            Не знайдено звернень за цим статусом
          </div>
        ) : (
          <ConnectionsListSection connections={dateFilteredConnections} />
        )}
        <ProblemCall />
      </div>
    </div>
  );
}
