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
  selectError,
  selectStats,
} from "../../redux/connections/selectors.js";
import { filterBySearchConnections } from "../../utils/filterCarsBySearchTerm.js";

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
  const [searchTerm, setSearchTerm] = useState("");

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

    dispatch(getConnectionsList(params));
    dispatch(getStats(params));
  }, [dispatch, selectedStatus, startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // console.log(term); // Це виведе введений термін пошуку
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
    }
  };

  // Фільтрація за статусом
  const filterByStatus = (connectionsList) => {
    return connectionsList.filter(
      (item) =>
        selectedStatus === "ALL" ||
        item.status.toUpperCase() === selectedStatus.toUpperCase()
    );
  };

  // Фільтрація за датою
  const filterByDate = (connectionsList) => {
    return connectionsList.filter((item) => {
      const itemDate = new Date(item.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);

      itemDate.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return itemDate >= start && itemDate <= end;
    });
  };

  // Фільтрація за пошуковим терміном
  const filterBySearch = () => {
      return filterBySearchConnections(filteredConnections, searchTerm);
    };
  
  // Застосовуємо фільтрацію по кожному критерію
  let filteredConnections = connectionsList || [];
  filteredConnections = filterByStatus(filteredConnections);
  filteredConnections = filterByDate(filteredConnections);
  filteredConnections = filterBySearch(filteredConnections);

  // Визначаємо повідомлення для різних випадків
  let noResultsMessage = null;
  if (filteredConnections.length === 0) {
    if (selectedStatus !== "ALL") {
      noResultsMessage = "Не знайдено звернень за цим статусом";
    } else if (searchTerm) {
      noResultsMessage = "Не знайдено звернень за цим пошуковим запитом";
    } else if (errorStatus === 404) {
      noResultsMessage = "Не знайдено звернень за поточний період";
    }
  }

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
        searchTerm={searchTerm}
        onSearch={handleSearch}
        filteredConnections={filteredConnections}
      />
      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection statsData={selectStatsData} />
        <HorizontalPBSection />
      </div>
      <div className={css.bottomWrapper}>
        {noResultsMessage ? (
          <div className={css.noConnectionsMessage}>{noResultsMessage}</div>
        ) : (
          <ConnectionsListSection connections={filteredConnections} />
        )}
        <ProblemCall />
      </div>
    </div>
  );
}
