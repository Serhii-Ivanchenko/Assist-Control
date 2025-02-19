import { useRef, useState } from "react";
import styles from "./EnterpriseInfo.module.css";
import { BsWrench, BsPersonLinesFill } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import EnterprisePopup from "./EnterprisePopup/EnterprisePopup";

const enterprises = ["ФОП Блудов", "ТОВ Ремонт", "ПП Автосервіс"];
const storages = ["Склад 1", "Склад 2", "Склад 3"];

export default function EnterpriseInfo() {
  const [selectedEnterprise, setSelectedEnterprise] = useState(enterprises[0]);
  const [selectedStorage, setSelectedStorage] = useState(storages[0]);

  const [enterprisePopupOpen, setEnterprisePopupOpen] = useState(false);
  const [storagePopupOpen, setStoragePopupOpen] = useState(false);

  const [arrowsState, setArrowsState] = useState({
    enterpriseArrow: false,
    storageArrow: false,
  });

  const buttonRef = useRef(null);

  const handleClick = (type, e) => {
    e.stopPropagation();
    setArrowsState((prevState) => {
      if (type === "enterprise") {
        return { ...prevState, enterpriseArrow: !prevState.enterpriseArrow };
      } else if (type === "storage") {
        return { ...prevState, storageArrow: !prevState.storageArrow };
      }
      return prevState;
    });

    if (type === "enterprise") {
      setStoragePopupOpen(false);
      setEnterprisePopupOpen((prev) => !prev);
    } else if (type === "storage") {
      setEnterprisePopupOpen(false);
      setStoragePopupOpen((prev) => !prev);
    }
  };

  const handleSelectTitle = (type, title) => {
    if (type === "enterprise") {
      setSelectedEnterprise(title);
    } else if (type === "storage") {
      setSelectedStorage(title);
    }
    setEnterprisePopupOpen(false);
    setStoragePopupOpen(false);
    setArrowsState({
      enterpriseArrow: false,
      storageArrow: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>03.02.2025</p>
      <button className={styles.linkBtn}>Замовлення №000</button>

      <div className={styles.infoBox}>
        <div className={styles.infoKey}>
          <BsWrench className={styles.icon} size={18} />
          <p className={styles.key}>Механік:</p>
        </div>
        <p className={styles.infoName}>Шевченко А.В.</p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoKey}>
          <BsPersonLinesFill className={styles.icon} size={18} />
          <p className={styles.key}>Менеджер:</p>
        </div>
        <p className={styles.infoName}>Олег А.В.</p>
      </div>

      <div className={styles.selectBox}>
        <div ref={buttonRef} className={styles.popupContainer}>
          <button
            className={styles.select}
            onClick={(e) => handleClick("enterprise", e)}
          >
            {selectedEnterprise}
            {arrowsState.enterpriseArrow ? (
              <TiArrowSortedUp />
            ) : (
              <TiArrowSortedDown />
            )}
          </button>
          {enterprisePopupOpen && (
            <EnterprisePopup
              onClose={() => setEnterprisePopupOpen(false)}
              options={enterprises}
              isOpen
              buttonRef={buttonRef}
              onSelect={(title) => handleSelectTitle("enterprise", title)}
            />
          )}
        </div>
        <div ref={buttonRef} className={styles.popupContainer}>
          <button
            className={styles.select}
            onClick={(e) => handleClick("storage", e)}
          >
            {selectedStorage}
            {arrowsState.storageArrow ? (
              <TiArrowSortedUp />
            ) : (
              <TiArrowSortedDown />
            )}
          </button>
          {storagePopupOpen && (
            <EnterprisePopup
              onClose={() => setStoragePopupOpen(false)}
              options={storages}
              isOpen
              buttonRef={buttonRef}
              onSelect={(title) => handleSelectTitle("storage", title)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
