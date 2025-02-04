import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsControlBarSection from "../ConnectionsControlBarSection/ConnectionsControlBarSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
// import LastConnectionSection from "../LastConnectionSection/LastConnectionSection.jsx";
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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getStats("all"));
    dispatch(getConnectionsList({ page: 1 }));
  }, [dispatch]);

  const filteredConnections = connectionsList.filter((item) => {
    const itemDate = new Date(item.created_at);
    itemDate.setHours(0, 0, 0, 0);

    const isStatusMatch = selectedStatus === "ALL" || item.status === selectedStatus;
    const isDateMatch = (!startDate || !endDate) || (itemDate >= startDate && itemDate <= endDate);

    return isStatusMatch && isDateMatch;
  });

  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection
        onStatusChange={setSelectedStatus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection />
        <HorizontalPBSection />
      </div>

      <div className={css.bottomWrapper}>
        <ConnectionsListSection connections={filteredConnections.length ? filteredConnections : connectionsList} />
        <ProblemCall />
      </div>
    </div>
  );
}

