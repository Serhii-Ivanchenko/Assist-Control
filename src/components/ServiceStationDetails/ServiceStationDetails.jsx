import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      Налаштування робочого графіка:{stationId}
      <div className={styles.decoration}></div>
    </div>
  );
}

export default ServiceStationDetails;
