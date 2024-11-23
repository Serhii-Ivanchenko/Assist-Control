import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import ServiceStationDetailsAccordion from "../ServiceStationDetailsAccordion/ServiceStationDetailsAccordion.jsx";
import styles from "./ServiceStationDetails.module.css";
import { useState } from "react";

function ServiceStationDetails({ stationId }) {
  const [isAccordionExpanded, setAccordionExpanded] = useState(false);

  const handleToggle = (isExpanded) => {
    setAccordionExpanded(isExpanded);
  };
  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceStationDetailsAccordion onToggle={handleToggle} />
      <ServiceStationDetailsBottom isAccordionExpanded={isAccordionExpanded} />
    </div>
  );
}

export default ServiceStationDetails;
