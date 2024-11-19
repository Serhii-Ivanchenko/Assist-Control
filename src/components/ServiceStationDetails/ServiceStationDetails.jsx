import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceStationDetailsTop />
      <ServiceStationDetailsBottom />
    </div>
  );
}

export default ServiceStationDetails;
