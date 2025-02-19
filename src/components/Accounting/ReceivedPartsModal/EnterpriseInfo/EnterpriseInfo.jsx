import { useRef, useState } from "react";
import styles from "./EnterpriseInfo.module.css";
import { BsWrench, BsPersonLinesFill, BsCaretDownFill } from "react-icons/bs";
// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import EnterprisePopup from "./EnterprisePopup/EnterprisePopup";

const enterprises = ["ФОП Блудов", "ТОВ Ремонт", "ПП Автосервіс"];
const storages = ["Склад 1", "Склад 2", "Склад 3"];

export default function EnterpriseInfo() {
  const [selectedEnterprise, setSelectedEnterprise] = useState(enterprises[0]);
  const [selectedStorage, setSelectedStorage] = useState(storages[0]);

  const [enterprisePopupOpen, setEnterprisePopupOpen] = useState(false);
  const [storagePopupOpen, setStoragePopupOpen] = useState(false);

  const enterpriseButtonRef = useRef(null);
  const storageButtonRef = useRef(null);

  const handleClickEnterpriseBtn = () => {
    setStoragePopupOpen(false);
    setEnterprisePopupOpen((prev) => !prev);
  };

  const handleClickStorageBtn = () => {
    setEnterprisePopupOpen(false);
    setStoragePopupOpen((prev) => !prev);
  };
  // const handleClick = (type, e) => {
  //   e.stopPropagation();
  //   setArrowsState((prevState) => {
  //     if (type === "enterprise") {
  //       return { ...prevState, enterpriseArrow: !prevState.enterpriseArrow };
  //     } else if (type === "storage") {
  //       return { ...prevState, storageArrow: !prevState.storageArrow };
  //     }
  //     return prevState;
  //   });

  //   if (type === "enterprise") {
  //     setStoragePopupOpen(false);
  //     setEnterprisePopupOpen((prev) => !prev);
  //   } else if (type === "storage") {
  //     setEnterprisePopupOpen(false);
  //     setStoragePopupOpen((prev) => !prev);
  //   }
  // };

  const handleSelectTitle = (type, title) => {
    if (type === "enterprise") {
      setSelectedEnterprise(title);
    } else if (type === "storage") {
      setSelectedStorage(title);
    }
    setEnterprisePopupOpen(false);
    setStoragePopupOpen(false);
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
        <div className={styles.popupContainer}>
          <button
            ref={enterpriseButtonRef}
            className={styles.select}
            onClick={handleClickEnterpriseBtn}
          >
            {selectedEnterprise}

            <BsCaretDownFill
              className={`${styles.arrowIcon} ${
                enterprisePopupOpen ? styles.rotated : ""
              }`}
            />
          </button>
          {enterprisePopupOpen && (
            <EnterprisePopup
              onClose={() => setEnterprisePopupOpen(false)}
              options={enterprises}
              isOpen
              buttonRef={enterpriseButtonRef}
              onSelect={(title) => handleSelectTitle("enterprise", title)}
            />
          )}
        </div>
        <div className={styles.popupContainer}>
          <button
            ref={storageButtonRef}
            className={styles.select}
            onClick={handleClickStorageBtn}
          >
            {selectedStorage}
            <BsCaretDownFill
              className={`${styles.arrowIcon} ${
                storagePopupOpen ? styles.rotated : ""
              }`}
            />
          </button>
          {storagePopupOpen && (
            <EnterprisePopup
              onClose={() => setStoragePopupOpen(false)}
              options={storages}
              isOpen
              buttonRef={storageButtonRef}
              onSelect={(title) => handleSelectTitle("storage", title)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
