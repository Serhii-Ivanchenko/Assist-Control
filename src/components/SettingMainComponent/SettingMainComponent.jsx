import { useState, useEffect } from "react";
import ServiceStationList from "../ServiceStationList/ServiceStationList";
import ServiceStationDetails from "../ServiceStationDetails/ServiceStationDetails";
import styles from "./SettingMainComponent.module.css";
import { useDispatch } from "react-redux";
// import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
import { setSelectedServiceInSettingsId } from "../../redux/service/slice.js";
// import { useSelector } from "react-redux";
import { getAllServices } from "../../redux/service/operations.js";
import { selectAllServices } from "../../redux/service/selectors.js";
import { useSelector } from "react-redux";

function SettingMainComponent() {
  const dispatch = useDispatch();
  // const defaultService = useSelector(selectSelectedServiceId);
  const [activeStationId, setActiveStationId] = useState(null);
  const services = useSelector(selectAllServices);

  useEffect(() => {}, [services]);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedServiceInSettingsId(activeStationId));
  }, [dispatch, activeStationId]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>Автосервіс</h2>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <ServiceStationList
            activeStationId={activeStationId}
            setActiveStationId={setActiveStationId}
          />
        </div>
        <div className={styles.rightContainer}>
          <ServiceStationDetails stationId={activeStationId} />
        </div>
      </div>
    </div>
  );
}

export default SettingMainComponent;
