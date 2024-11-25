import { GiSettingsKnobs } from "react-icons/gi";
import styles from "./CarInfoSettings.module.css";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { toggleVisibilityCar } from "../../../redux/cars/slice";
import { toggleVisibilityRecords } from "../../../redux/crm/slice";
import { selectVisibilityCar } from "../../../redux/cars/selectors";
import { selectVisibilityRecords } from "../../../redux/crm/selectors";

const CarInfoSettings = ({ isCrmView }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const dispatch = useDispatch();

  const visibility = useSelector(
    isCrmView ? selectVisibilityRecords : selectVisibilityCar
  );
  const toggleVisibilityAction = isCrmView
    ? toggleVisibilityRecords
    : toggleVisibilityCar;

  const toggleSettings = () => {
    setSettingsIsOpen((prev) => !prev);
  };

  const handleToggle = (key) => {
    dispatch(toggleVisibilityAction({ key }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setSettingsIsOpen(false);
      }
    };

    if (settingsIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsIsOpen]);

  const labelNames = {
    name: "Ім'я",
    rating: "Рейтинг",
    carNum: "Номер машини",
    carModelYear: "Марка-модель",
    vin: "VIN",
    mileage: "Пробіг",
    time: "Час",
    photo: "Фото",
    totalPrice: "Загальна сума",
    paymentBtn: "Оплатити",
    phoneNumber: "Телефон",
    status: "Статус",
    info: "Інфо",
    createBtn: "Створити запис",
    archive: "Архів",
    prePayment: "Предоплата"
  };

  return (
    <div className={styles.btnSettingsContainer} ref={popoverRef}>
      <button className={styles.btnSettings} onClick={toggleSettings}>
        <GiSettingsKnobs className={styles.iconSettings} />
      </button>
      {settingsIsOpen && (
        <div
          className={clsx(styles.settingsContainer, {
            [styles.settingsContainerInCrm]: isCrmView,
          })}
        >
          {Object.entries(visibility)
            .filter(([key]) => {
              if (
                !isCrmView &&
                (key === "createBtn" ||
                  key === "archive" ||
                  key === "paymentBtn")
              ) {
                return false;
              }
              return true;
            })
            .map(([key, value]) => (
              <div className={styles.switchItem} key={key}>
                <label htmlFor={key}>{labelNames[key] || key}</label>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleToggle(key)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CarInfoSettings;
