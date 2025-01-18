import { MdClose } from "react-icons/md";
import { BsLayerBackward, BsBookmark } from "react-icons/bs";
import styles from "./ChatPopups.module.css";

function SettingsPopup({ onClose }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.settingsList}>
        <li>
          <button className={styles.settingsBtn} onClick={() => onClose()}>
            <BsBookmark size={18} />
            Додати чат в обрані
          </button>
        </li>
        <li>
          <button className={styles.settingsBtn} onClick={() => onClose()}>
            <BsLayerBackward size={18} />
            Додати чат в архів
          </button>
        </li>
        <li>
          <button className={styles.settingsBtn} onClick={() => onClose()}>
            <MdClose style={{ transform: "scale(1.4)" }} />
            Закрити чат
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SettingsPopup;
