import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      Налаштування робочого графіка:{stationId}
      <ServiceStationDetailsBottom/>
    </div>
  );
}

export default ServiceStationDetails;
