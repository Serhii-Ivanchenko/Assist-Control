import { useRef, useState } from "react";
import styles from "./EnterpriseInfo.module.css";
import { BsWrench, BsPersonLinesFill } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import EnterprisePopup from "./EnterprisePopup/EnterprisePopup";

const enterprises = ["ФОП Блудов", "ТОВ Ремонт", "ПП Автосервіс"];
const storages = ["Склад 1", "Склад 2", "Склад 3"];

export default function EnterpriseInfo() {
  const [popupType, setPopupType] = useState(null);
  const [selectedEnterprise, setSelectedEnterprise] = useState("ФОП Блудов");
  const [selectedStorage, setSelectedStorage] = useState("Склад 1");

  const buttonRef = useRef(null);

  const handleClick = (type, e) => {
    e.stopPropagation();
    setPopupType((prevType) => (prevType === type ? null : type));
  };

  const handleSelectTitle = (type, title) => {
    if (type === "enterprise") {
      setSelectedEnterprise(title);
    } else if (type === "storage") {
      setSelectedStorage(title);
    }
    setPopupType(null);
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
            <TiArrowSortedDown className={styles.arrowIcon} />
          </button>
          {popupType === "enterprise" && (
            <EnterprisePopup
              onClose={() => setPopupType(null)}
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
            <TiArrowSortedDown className={styles.arrowIcon} />
          </button>
          {popupType === "storage" && (
            <EnterprisePopup
              onClose={() => setPopupType(null)}
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
