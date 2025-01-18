import { TbPhoneCalling } from "react-icons/tb";
import styles from "./ChatPopups.module.css";

function TelephonePopup({ onClose }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.phonePopup}>
        <p>Здійснити виклик користувачу</p>
        <a
          className={styles.clientName}
          href="tel:+380123456789"
          onClick={() => onClose()}
        >
          <TbPhoneCalling className={styles.phoneIcon} />
          Олександр Мельник
        </a>
      </div>
    </div>
  );
}

export default TelephonePopup;
