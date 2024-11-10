import { useState } from "react";
import ServiceStationList from "../ServiceStationList/ServiceStationList";
import ServiceStationDetails from "../ServiceStationDetails/ServiceStationDetails";
import styles from "./SettingMainComponent.module.css";

function SettingMainComponent() {
  const [activeStationId, setActiveStationId] = useState(null);
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
