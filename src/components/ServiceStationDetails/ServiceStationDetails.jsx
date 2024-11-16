import ServiceSchedule from "../ServiceStationDetailsBottom/ServiceSchedule/ServiceSchedule.jsx";
import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      {/* <ServiceSchedule stationId={stationId} /> */}
      {/* <ServiceStationDetailsTop /> */}
      <ServiceStationDetailsBottom stationId={stationId} />
    </div>
  );
}

export default ServiceStationDetails;
