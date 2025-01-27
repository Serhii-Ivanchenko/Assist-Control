import {
  BsPencil,
  BsGeoAlt,
  BsCreditCard2Back,
  BsPeople,
  BsCalendarWeek,
  BsEnvelope,
  BsCaretDownFill,
} from "react-icons/bs";
// import { RiSave3Fill } from "react-icons/ri";

import styles from "./ServiceStationItem.module.css";
import { useState, useEffect } from "react";
import AddAutoServiceModal from "../Modals/AddAutoServiceModal/AddAutoServiceModal";
import Modal from "../Modals/Modal/Modal";

function ServiceStationItem({ isOpen, onToggle, isActive, station }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

  const handlePencilBtnClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [info, setInfo] = useState(() => {
    const savedInfo = localStorage.getItem(name);
    return savedInfo
      ? JSON.parse(savedInfo)
      : {
          // stationName: station.name,
          // email: "atmosfera-che@gmail.com",
          // address: "бул. Івана Кркача 54",
          subscriptionStatus: "PRO",
          employees: "8",
          validUntil: "22.10.2025",
        };
  });

  // useEffect(() => {
  //   if (!isActive) {
  //     setIsEdit(false);
  //   }
  // }, [isActive]);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(info));
  }, [info, name]);

  // const handleEditToggle = () => {
  //   setIsEdit((prev) => !prev);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  // };

  return (
    <div className={styles.generalContainer}>
      {isOpen ? (
        <div
          className={styles.serviceWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.serviceContainer}>
            {/* {isEdit ? (
              <input
                type="text"
                name="stationName"
                value={info.stationName}
                onChange={handleInputChange}
                className={styles.infoValueInput}
              />
            ) : (
              <h3 className={styles.serviceTitle}>{name}</h3>
            )} */}

            <img src={station.logo} alt="Logo" className={styles.logo} />
            <h3 className={styles.serviceTitle}>{station.name}</h3>
            <button className={styles.editBtn} onClick={handlePencilBtnClick}>
              {/* {isEdit ? (
                <RiSave3Fill className={styles.mainIcon} size={21} />
              ) : (
                <BsPencil
                  className={styles.mainIcon}
                  onClick={handlePencilBtnClick}
                />
              )} */}
              <BsPencil className={styles.mainIcon} />
            </button>
          </div>

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <div className={styles.infoKey}>
                <BsEnvelope className={styles.keyIcon} />
                <p>Email</p>
              </div>
              {/* {isEdit ? (
                <input
                  type="text"
                  name="email"
                  value={info.email}
                  onChange={handleInputChange}
                  className={styles.infoValueInput}
                />
              ) : (
                <p className={styles.infoValue}>{info.email}</p>
              )} */}
              <p className={styles.infoValue}>{station.email}</p>
            </li>
            <li className={styles.infoItem}>
              <p className={styles.infoKey}>
                <BsGeoAlt className={styles.keyIcon} /> Адреса
              </p>
              {/* {isEdit ? (
                <input
                  type="text"
                  name="address"
                  value={info.address}
                  onChange={handleInputChange}
                  className={styles.infoValueInput}
                />
              ) : (
                <p className={styles.infoValue}>{info.address}</p>
              )} */}
              <p className={styles.infoValue}>{station.address}</p>
            </li>
            <li className={styles.infoItem}>
              <p className={styles.infoKey}>
                <BsCreditCard2Back className={styles.keyIcon} /> Статус
                підписки:
              </p>
              <div className={styles.subscribeStatus}>
                <BsCreditCard2Back />
                {info.subscriptionStatus}
              </div>
            </li>
            <li className={styles.infoItem}>
              <p className={styles.infoKey}>
                <BsPeople className={styles.keyIcon} /> Співробітники
              </p>
              {/* {isEdit ? (
                <input
                  type="text"
                  name="employees"
                  value={info.employees}
                  onChange={handleInputChange}
                  className={styles.infoValueInput}
                />
              ) : (
                <p className={styles.infoValue}>{info.employees}</p>
              )} */}
              <p className={styles.infoValue}>{info.employees}</p>
            </li>
            <li className={styles.infoItem}>
              <p className={styles.infoKey}>
                <BsCalendarWeek className={styles.keyIcon} /> Дійсний до:
              </p>
              {/* {isEdit ? (
                <input
                  type="text"
                  name="validUntil"
                  value={info.validUntil}
                  onChange={handleInputChange}
                  className={styles.infoValueInput}
                />
              ) : (
                <p className={styles.infoValue}>{info.validUntil}</p>
              )} */}
              <p className={styles.infoValue}>{info.validUntil}</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.closedServiceWrapper} onClick={onToggle}>
          <div className={styles.closedServiceContainer}>
            <h3 className={styles.serviceTitle}>{station.name}</h3>
          </div>
          <button className={styles.editBtn} onClick={handlePencilBtnClick}>
            {/* {isEdit ? (
                <RiSave3Fill className={styles.mainIcon} size={21} />
              ) : (
                <BsPencil
                  className={styles.mainIcon}
                  onClick={handlePencilBtnClick}
                />
              )} */}
            <BsPencil className={styles.mainIcon} />
          </button>
          <div className={styles.closedServiceInfo}>
            <div className={styles.subscribeStatus}>
              <BsCreditCard2Back /> PRO
            </div>

            <BsCaretDownFill
              className={styles.arrowIcon}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddAutoServiceModal
            onClose={handleCloseModal}
            updateAutoService={true}
            station={station}
          />
        </Modal>
      )}
    </div>
  );
}

export default ServiceStationItem;
