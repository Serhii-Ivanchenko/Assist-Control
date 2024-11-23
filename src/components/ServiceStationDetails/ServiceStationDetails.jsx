import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsTop from '../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx';
import ServiceStationDetailsAccordion from '../ServiceStationDetailsAccordion/ServiceStationDetailsAccordion.jsx'
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceStationDetailsAccordion />
      <ServiceStationDetailsBottom />
    </div>
  );
}

export default ServiceStationDetails;
