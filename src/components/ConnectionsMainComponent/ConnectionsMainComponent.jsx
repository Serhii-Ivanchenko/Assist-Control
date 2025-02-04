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

  useEffect(() => {
    dispatch(getStats("all"));
    dispatch(getConnectionsList({ page: 1 }));
  }, [dispatch]);

  const filteredConnections =
    selectedStatus === "ALL"
      ? connectionsList
      : connectionsList.filter((item) => item.status === selectedStatus);

  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection onStatusChange={setSelectedStatus} />
      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection />
        <HorizontalPBSection />
      </div>

      <div className={css.bottomWrapper}>
        <ConnectionsListSection connections={filteredConnections}/>
        {/* <LastConnectionSection /> */}
        <ProblemCall />
      </div>
    </div>
  );
}
