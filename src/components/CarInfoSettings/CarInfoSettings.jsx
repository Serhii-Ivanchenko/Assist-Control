import { GiSettingsKnobs } from "react-icons/gi";
import styles from "./CarInfoSettings.module.css";
import { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { toggleVisibility } from "../../redux/cars/slice";
import { selectVisibility } from "../../redux/cars/selectors";
import { useDispatch } from "react-redux";

export default function CarInfoSettings({  isCrmView }) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const dispatch = useDispatch();

  const visibility = useSelector(selectVisibility);

  const toggleSettings = () => {
    setSettingsIsOpen(!settingsIsOpen);
  };

  const handleToggle = (key) => {
    dispatch(toggleVisibility({ key }));
  };

  return (
    <div className={styles.btnSettingsContainer}>
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
              if (!isCrmView && (key === "createBtn" || key === "archive" || key === "paymentBtn")) {
                return false;
              }
              return true;
            })
            .map(([key, value]) => (
              <div className={styles.switchItem} key={key}>
                <label htmlFor={key}>
                  {(() => {
                    switch (key) {
                      case "name":
                        return "Ім'я";
                      case "raiting":
                        return "Рейтинг";
                      case "carNum":
                        return "Номер машини";
                      case "carModelYear":
                        return "Марка-модель";
                      case "vin":
                        return "VIN";
                      case "mileage":
                        return "Пробіг";
                      case "time":
                        return "Час";
                      case "photo":
                        return "Фото";
                      case "totalPrice":
                        return "Загальна сума";
                      case "prePayment":
                        return "Переплата";
                      case "paymentBtn":
                        return "Оплатити";
                      case "phoneNumber":
                        return "Телефон";
                      case "status":
                        return "Статус";
                      case "info":
                        return "Інфо";
                      case "createBtn":
                        return "Створити запис";
                      case "archive":
                        return "Архів";
                      default:
                        return key;
                    }
                  })()}
                </label>
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
}
