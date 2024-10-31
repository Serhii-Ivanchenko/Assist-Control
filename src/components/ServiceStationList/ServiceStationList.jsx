import { useState } from "react";
import ServiceStationItem from "../ServiceStationItem/ServiceStationItemItem";
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
      {stations.map((station) => (
        <ServiceStationItem
          className={styles.serviceStationItem}
          key={station.id}
          id={station.id}
          name={station.name}
          isOpen={activeStationId === station.id}
          onToggle={() => handleToggle(station.id)}
        />
      ))}
    </div>
  );
}

export default ServiceStationList;
