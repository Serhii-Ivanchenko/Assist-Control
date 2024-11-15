import { GiSettingsKnobs } from "react-icons/gi";
import styles from "./CarInfoSettings.module.css";
import { useState, useEffect } from "react";

export default function CarInfoSettings({ onToggleVisibility }) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [visibility, setVisibility] = useState({
    name: true,
    raiting: true,
    carNum: true,
    carModelYear: true,
    vin: true,
    mileage: true,
    time: true,
    photo: true,
    totalPrice: true,
    prePayment: true,
    button: true,
    phoneNumber: true,
    status: true,
    info: true,
    createBtn: true,
    archive: true,
  });

  const toggleSettings = () => {
    setSettingsIsOpen(!settingsIsOpen);
  };

  const handleToggle = (field) => {
    setVisibility((prev) => {
      const newVisibility = { ...prev, [field]: !prev[field] };
      return newVisibility;
    });
  };

  // Викликаємо onToggleVisibility після оновлення visibility
  useEffect(() => {
    onToggleVisibility(visibility);
  }, [visibility, onToggleVisibility]); // Викликається, коли visibility змінюється

  return (
    <div className={styles.btnSettingsContainer}>
      <button className={styles.btnSettings} onClick={toggleSettings}>
        <GiSettingsKnobs className={styles.iconSettings} />
      </button>
      {settingsIsOpen && (
        <div className={styles.settingsContainer}>
          {Object.entries(visibility).map(([key, value]) => (
            <div className={styles.switchItem} key={key}>
              <label htmlFor={key}>
                {(() => {
                  switch (key) {
                    case 'name': return "Ім'я";
                    case 'raiting': return 'Рейтинг';
                    case 'carNum': return 'Номер машини';
                    case 'carModelYear': return 'Марка-модель';
                    case 'vin': return 'Він';
                    case 'mileage': return 'Пробіг';
                    case 'time': return 'Час';
                    case 'photo': return 'Фото';
                    case 'totalPrice': return 'Загальна сума';
                    case 'prePayment': return 'Переплата';
                    case 'button': return 'Кнопка';
                    case 'phoneNumber': return 'Телефон';
                    case 'status': return 'Статус';
                    case 'info': return 'Інфо';
                    case 'createBtn': return 'Створити запис';
                    case 'archive': return 'Архів';
                    default: return key;
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
