import styles from "./PremiumAd.module.css";
import { FaCrown } from "react-icons/fa";

export default function PremiumAd() {
  return (
    <div className={styles.premiumContainer}>
        <FaCrown className={styles.premiumIcon} />
        <div className={styles.textBlock}>
          <h3 className={styles.premiumTitle}>Преміум</h3>
          <p className={styles.premiumDescription}>
            Ще більше різних можливостей <br /> для Вас!
          </p>
        </div>
        <button className={styles.premiumButton}>Перейти</button>
    </div>
  );
}
