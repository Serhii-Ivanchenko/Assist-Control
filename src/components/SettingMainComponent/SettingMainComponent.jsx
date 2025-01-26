import { useState, useEffect } from "react";
import ServiceStationList from "../ServiceStationList/ServiceStationList";
import ServiceStationDetails from "../ServiceStationDetails/ServiceStationDetails";
import styles from "./SettingMainComponent.module.css";
import { useDispatch } from "react-redux";
// import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
import { setSelectedServiceInSettingsId } from "../../redux/service/slice.js";
// import { useSelector } from "react-redux";
import { getAllServices } from "../../redux/service/operations.js";
import {} from "../../redux/service/selectors.js";

function SettingMainComponent() {
  const dispatch = useDispatch();
  // const defaultService = useSelector(selectSelectedServiceId);
  const [activeStationId, setActiveStationId] = useState(null);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(setSelectedServiceInSettingsId(activeStationId));
  }, [activeStationId]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>Автосервіс</h2>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <ServiceStationList
            activeStationId={activeStationId}
            setActiveStationId={setActiveStationId}
          />
        </div>
        <div className={styles.rightContainer}>
          <ServiceStationDetails stationId={activeStationId} />
        </div>
      </div>
    </div>
  );
}

export default SettingMainComponent;
