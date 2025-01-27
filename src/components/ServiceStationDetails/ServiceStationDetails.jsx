// import { useRef, useState } from "react";
import ServiceStationDetailsBottom from "../ServiceStationDetailsBottom/ServiceStationDetailsBottom";
import ServiceStationDetailsAccordion from "../ServiceStationDetailsAccordion/ServiceStationDetailsAccordion.jsx";
import styles from "./ServiceStationDetails.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedServiceInSettingsId } from "../../redux/service/selectors.js";
import { useDispatch } from "react-redux";
import { getAllEmployees, getPosts, getWorkSchedule } from "../../redux/settings/operations.js";

function ServiceStationDetails({ stationId }) {
  const [isAccordionExpanded, setAccordionExpanded] = useState(false);

  const handleToggle = (isExpanded) => {
    setAccordionExpanded(isExpanded);
  };

 const selectedServiceInSettings = useSelector(selectedServiceInSettingsId);

 const dispatch = useDispatch();
 useEffect(() => {
   if (!selectedServiceInSettings) {
     console.log("Waiting for selectedServiceInSettings to be available...");
     return;
   }

   const fetchData = async () => {
     try {
       console.log("Fetching data with ID:", selectedServiceInSettings);
       await dispatch(getAllEmployees()).unwrap();
       await dispatch(getPosts()).unwrap();
        await dispatch(getWorkSchedule()).unwrap();
     } catch (error) {
       console.error("Помилка завантаження даних:", error);
     }
   };

   fetchData();
 }, [dispatch, selectedServiceInSettings]);


  return (
    <div className={styles.serviceDetailsWrapper}>
      <ServiceStationDetailsAccordion onToggle={handleToggle} />
      <ServiceStationDetailsBottom isAccordionExpanded={isAccordionExpanded} />
    </div>
  );
}

export default ServiceStationDetails;
