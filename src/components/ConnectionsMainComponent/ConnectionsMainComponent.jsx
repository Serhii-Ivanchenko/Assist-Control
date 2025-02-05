import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsControlBarSection from "../ConnectionsControlBarSection/ConnectionsControlBarSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
import ProblemCall from "../ProblemCall/ProblemCall.jsx";
import css from "./ConnectionsMainComponent.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getConnectionsList,
  getStats,
} from "../../redux/connections/operations.js";
import { selectConnectionsList } from "../../redux/connections/selectors.js";
import { useSelector } from "react-redux";

export default function ConnectionsMainComponent() {
  const dispatch = useDispatch();
  const connectionsList = useSelector(selectConnectionsList);
  
  const [selectedStatus, setSelectedStatus] = useState("ALL"); 
  const [timeFilter, setTimeFilter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  const handleTimeFilterChange = (index) => {
    let timeFilterValue = "all";
    switch (index) {
      case 0:
        timeFilterValue = "day";
        break;
      case 1:
        timeFilterValue = "week";
        break;
      case 2:
        timeFilterValue = "month";
        break;
      default:
        timeFilterValue = "all";
    }
    setTimeFilter(timeFilterValue);
  };

  useEffect(() => {
    console.log("Fetching stats and connections...");
    dispatch(getStats("all"));
    dispatch(getConnectionsList({ page: 1, end_date: endDate }));
  }, [dispatch, endDate]);

  useEffect(() => {
    if (startDate || endDate || timeFilter) {
      const params = {
        page: 1,
        start_date: startDate ? startDate.toISOString().split("T")[0] + "T00:00:00" : undefined,
        end_date: endDate ? endDate.toISOString().split("T")[0] + "T23:59:59" : undefined,
        date_filter: timeFilter,
      };

      console.log("Params sent to backend:", params); 
      dispatch(getConnectionsList(params));
    }
  }, [dispatch, startDate, endDate, timeFilter]);

  useEffect(() => {
    console.log("Connections List from Backend:", connectionsList); 
  }, [connectionsList]);

  const filteredConnections = connectionsList.filter((item) => {
    return selectedStatus === "ALL" || item.status.toUpperCase() === selectedStatus.toUpperCase();
  });

  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection
        onStatusChange={setSelectedStatus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSelectTimeRange={handleTimeFilterChange}
        periodStartData={startDate}
        periodEndData={endDate}
        setPeriodStartData={setStartDate}
        setPeriodEndData={setEndDate}
      />
      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection />
        <HorizontalPBSection />
      </div>
      <div className={css.bottomWrapper}>
        {filteredConnections.length === 0 ? (
          <div className={css.noConnectionsMessage}>Не знайдено звернень за цим статусом</div>
        ) : (
          <ConnectionsListSection connections={filteredConnections} />
        )}
        <ProblemCall />
      </div>
    </div>
  );
}
