import styles from "./RangeTimeSelector.module.css";

export default function RangeTimeSelector() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.timeContainer}>
                <p className={styles.timeText}>За день</p>
            </div>
            <div className={styles.timeContainer}>
                <p className={styles.timeText}>За тиждень</p>
            </div>
            <div className={styles.timeContainer}>
                <p className={styles.timeText}>За місяць</p>
            </div>
            <div className={styles.timeContainer}>
                <p className={styles.timeText}>Весь час</p>
            </div>
        </div>
    );
  }