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
import { selectConnectionsList } from "../../redux/connections/selectors.js";

export default function ConnectionsMainComponent() {
  const dispatch = useDispatch();
  const connectionsList = useSelector(selectConnectionsList);

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    dispatch(getConnectionsList({ page: 1 }));
    dispatch(getStats());
  }, [dispatch]);

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

    console.log("Params sent to backend:", params);
    dispatch(getConnectionsList(params));
  }, [dispatch, selectedStatus, startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Фільтрація за статусом
  const statusFilteredConnections = connectionsList.filter(
    (item) =>
      selectedStatus === "ALL" || item.status.toUpperCase() === selectedStatus.toUpperCase()
  );

  // Фільтрація за датою
  const dateFilteredConnections = statusFilteredConnections.filter((item) => {
    const itemDate = new Date(item.created_at);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection
        onStatusChange={setSelectedStatus}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
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
        {statusFilteredConnections.length === 0 ? (
          <div className={css.noConnectionsMessage}>
            Не знайдено звернень за цим статусом
          </div>
        ) : dateFilteredConnections.length === 0 ? (
          <div className={css.noConnectionsMessage}>
            Не знайдено звернень за поточний період
          </div>
        ) : (
          <ConnectionsListSection connections={dateFilteredConnections} />
        )}
        <ProblemCall />
      </div>
    </div>
  );
}
