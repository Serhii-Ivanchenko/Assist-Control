import ServiceSchedule from "../ServiceStationDetailsBottom/ServiceSchedule/ServiceSchedule.jsx";
import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceSchedule stationId={stationId} />
      <ServiceStationDetailsBottom />
    </div>
  );
}

export default ServiceStationDetails;
