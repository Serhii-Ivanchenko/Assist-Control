import { useEffect, useMemo, useState } from "react";
import ServiceStationItem from "../ServiceStationItem/ServiceStationItemItem";
import { BsPlusCircleDotted } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import styles from "./ServiceStationList.module.css";
import AddAutoServiceModal from "../Modals/AddAutoServiceModal/AddAutoServiceModal";
import Modal from "../Modals/Modal/Modal";

function ServiceStationList({ activeStationId, setActiveStationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoEditing, setIsInfoEditing] = useState(false);

  const handleAddBtnClick = () => {
    setIsModalOpen(true);
    setIsInfoEditing(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const stations = useMemo(
    () => [
      {
        id: 1,
        name: "AvtoAtmosfera Cherkasy",
      },
      {
        id: 2,
        name: "GCAR Kyiv",
      },
    ],
    []
  );

  useEffect(() => {
    if (stations.length > 0 && activeStationId === null) {
      setActiveStationId(stations[0].id);
    }
  }, [stations, activeStationId, setActiveStationId]);

  const handleToggle = (id) => {
    setActiveStationId((prevId) => (prevId === id ? null : id));
  };

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
              isActive={activeStationId === station.id}
            />
          </div>
        ))}
      </div>
      <button className={styles.addBtn} onClick={handleAddBtnClick}>
        <BsPlusCircleDotted className={styles.icon} />
        <BsHouseFill className={styles.icon} />
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddAutoServiceModal
            onClose={handleCloseModal}
            infoToEdit={isInfoEditing}
          />
        </Modal>
      )}
    </div>
  );
}

export default ServiceStationList;
