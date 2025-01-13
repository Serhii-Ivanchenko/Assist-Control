import { MdFavorite, MdClose } from "react-icons/md";
import { BsLayerBackward } from "react-icons/bs";
import styles from "./ChatPopups.module.css";

function SettingsPopup({ onClose }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsPopup}>
        <ul className={styles.settingsList}>
          <li>
            <button className={styles.settingsBtn} onClick={() => onClose()}>
              <MdFavorite />
              Додати чат в обрані
            </button>
          </li>
          <li>
            <button className={styles.settingsBtn} onClick={() => onClose()}>
              <BsLayerBackward />
              Додати чат в архів
            </button>
          </li>
          <li>
            <button className={styles.settingsBtn} onClick={() => onClose()}>
              <MdClose />
              Закрити чат
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPopup;
