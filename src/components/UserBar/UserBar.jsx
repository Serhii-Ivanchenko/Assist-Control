import styles from './UserBar.module.css';
import { FiSettings } from "react-icons/fi";

export default function UserBar() {
  return (
    <div className={styles.userBarContainer}>
      <button className={styles.btn}><FiSettings className={styles.iconSettings} /></button>
      {/* <button className={styles.btn}><FiLogOut  /></button> */}
    </div>
  );
}
