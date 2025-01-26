import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsControlBarSection from "../ConnectionsControlBarSection/ConnectionsControlBarSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
// import LastConnectionSection from "../LastConnectionSection/LastConnectionSection.jsx";
import ProblemCall from "../ProblemCall/ProblemCall.jsx";
import css from "./ConnectionsMainComponent.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getConnectionsList,
  getStats,
} from "../../redux/connections/operations.js";

export default function ConnectionsMainComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats("all"));
    dispatch(getConnectionsList({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ConnectionsControlBarSection />

      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection />
        <HorizontalPBSection />
      </div>

      <div className={css.bottomWrapper}>
        <ConnectionsListSection />
        {/* <LastConnectionSection /> */}
        <ProblemCall />
      </div>
    </div>
  );
}
