import ServiceStationList from "../ServiceStationList/ServiceStationList";
import styles from "./SettingMainComponent.module.css";

function SettingMainComponent() {
  return (
    <div>
      <h2 className={styles.mainTitle}>Автосервіс</h2>
      <ServiceStationList />
    </div>
  );
}

export default SettingMainComponent;
