import {
  BsPencil,
  BsGeoAlt,
  BsCreditCard2Back,
  BsPeople,
  BsCalendarWeek,
  BsEnvelope,
  BsCaretDownFill,
} from "react-icons/bs";

import styles from "./ServiceStationItem.module.css";
import { useState } from "react";

function ServiceStationItem({ name, isOpen, onToggle }) {
  const [isEdit, setIsEdit] = useState(false);
  const [info, setInfo] = useState({
    email: "atmosfera-che@gmail.com",
    address: "бул. Івана Кркача 54",
    subscriptionStatus: "PRO",
    employees: "8",
    validUntil: "22.10.2025",
  });

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.generalContainer}>
      {isOpen ? (
        <div className={styles.wrapper} onClick={onToggle}>
          <div
            className={styles.serviceWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.serviceContainer}>
              <h3 className={styles.serviceTitle}>{name}</h3>
              <button
                className={styles.editBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditToggle();
                }}
              >
                <BsPencil className={styles.mainIcon} />
              </button>
            </div>
            <div className={styles.infoContainer}>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <p className={styles.infoKey}>
                    <BsEnvelope className={styles.keyIcon} /> Email
                  </p>
                  {isEdit ? (
                    <input
                      type="text"
                      name="email"
                      value={info.email}
                      onChange={handleInputChange}
                      className={styles.infoValueInput}
                    />
                  ) : (
                    <p className={styles.infoValue}>{info.email}</p>
                  )}
                </li>
                <li className={styles.infoItem}>
                  <p className={styles.infoKey}>
                    <BsGeoAlt className={styles.keyIcon} /> Адреса
                  </p>
                  {isEdit ? (
                    <input
                      type="text"
                      name="address"
                      value={info.address}
                      onChange={handleInputChange}
                      className={styles.infoValueInput}
                    />
                  ) : (
                    <p className={styles.infoValue}>{info.address}</p>
                  )}
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
                  {isEdit ? (
                    <input
                      type="text"
                      name="employees"
                      value={info.employees}
                      onChange={handleInputChange}
                      className={styles.infoValueInput}
                    />
                  ) : (
                    <p className={styles.infoValue}>{info.employees}</p>
                  )}
                </li>
                <li className={styles.infoItem}>
                  <p className={styles.infoKey}>
                    <BsCalendarWeek className={styles.keyIcon} /> Дійсний до:
                  </p>
                  {isEdit ? (
                    <input
                      type="text"
                      name="validUntil"
                      value={info.validUntil}
                      onChange={handleInputChange}
                      className={styles.infoValueInput}
                    />
                  ) : (
                    <p className={styles.infoValue}>{info.validUntil}</p>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.closedServiceWrapper} onClick={onToggle}>
          <div className={styles.closedServiceContainer}>
            <h3 className={styles.serviceTitle}>{name}</h3>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleEditToggle();
              }}
            >
              <BsPencil className={styles.mainIcon} />
            </button>
          </div>
          <div className={styles.closedServiceInfo}>
            <div className={styles.subscribeStatus}>
              <BsCreditCard2Back /> PRO
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation;
                onToggle;
              }}
            >
              <BsCaretDownFill className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceStationItem;
