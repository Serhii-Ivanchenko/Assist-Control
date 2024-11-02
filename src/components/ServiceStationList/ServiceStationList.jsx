import { useState } from "react";
import ServiceStationItem from "../ServiceStationItem/ServiceStationItemItem";
import ServiceStationDetails from "../ServiceStationDetails/ServiceStationDetails";
import { BsPlusCircleDotted } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import styles from "./ServiceStationList.module.css";

function ServiceStationList() {
  const [activeStationId, setActiveStationId] = useState(null);

  const handleToggle = (id) => {
    setActiveStationId((prevId) => (prevId === id ? null : id));
  };

  const stations = [
    {
      id: 1,
      name: "AvtoAtmosfera Cherkasy",
    },
    {
      id: 2,
      name: "GCAR Kyiv",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        {stations.map((station) => (
          <div key={station.id} className={styles.serviceStationWrapper}>
            <ServiceStationItem
              id={station.id}
              name={station.name}
              isOpen={activeStationId === station.id}
              onToggle={() => handleToggle(station.id)}
            />
            {activeStationId === station.id && (
              <div className={styles.rightContainer}>
                <ServiceStationDetails stationId={activeStationId} />
              </div>
            )}
          </div>
        ))}
       
      </div>
       <button className={styles.addBtn}>
          <BsPlusCircleDotted className={styles.icon} />
          <BsHouseFill className={styles.icon} />
        </button>
    </div>
  );
}

export default ServiceStationList;
