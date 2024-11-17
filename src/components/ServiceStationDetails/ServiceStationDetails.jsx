// import { useRef, useState } from "react";
import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsTop from '../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx';
import styles from "./ServiceStationDetails.module.css";

function ServiceStationDetails({ stationId }) {
  // const scheduleOpenRef = useRef(); 

  // const isOpen = () => {
  // return scheduleOpenRef.current.getAttribute('aria-expanded') === 'true'
    
  // }
  // const [activeDD, setActiveDD] = useState(false);

  // const handleOpen = () => {
  //  setActiveDD(!activeDD)
  // }

  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceStationDetailsTop /> 
      <ServiceStationDetailsBottom />
    </div>
  );
}

export default ServiceStationDetails;
