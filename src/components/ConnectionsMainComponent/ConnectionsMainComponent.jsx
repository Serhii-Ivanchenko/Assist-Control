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
  const [endDate, setEndDate] = useState(null);
  const [isDateChanged, setIsDateChanged] = useState(false);

  useEffect(() => {
    console.log("Current timeFilter:", timeFilter); 
  
    const params = {
      page: 1,
      per_page: 10,
      ...(timeFilter && { date_filter: timeFilter }),
    };
  
    console.log("Params sent to backend:", params); 
    dispatch(getConnectionsList(params));
  }, [dispatch, timeFilter]);
  

  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setIsDateChanged(true);
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setIsDateChanged(true);
  };
  
  useEffect(() => {
    const params = {
      page: 1,
      ...(isDateChanged && startDate && {
        start_date: startDate.toISOString().split("T")[0] + "T00:00:00",
      }),
      ...(isDateChanged && endDate && {
        end_date: endDate.toISOString().split("T")[0] + "T23:59:59",
      }),
      ...(timeFilter && { date_filter: timeFilter }),
    };
  
    console.log("Params sent to backend:", params);
    dispatch(getConnectionsList(params));
  }, [dispatch, startDate, endDate, timeFilter, isDateChanged]);

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
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
       onSelectTimeRange={(value) => setTimeFilter(() => value)}

        periodStartData={startDate}
        periodEndData={endDate}
        setPeriodStartData={handleStartDateChange}
        setPeriodEndData={handleEndDateChange}
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
