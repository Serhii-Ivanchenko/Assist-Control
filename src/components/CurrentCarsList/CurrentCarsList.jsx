import CurrentCarsItem from "../CurrentCarsItem/CurrentCarsItem.jsx";
import styles from "./CurrentCarsList.module.css";

export default function CurrentCarsList() {
  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.wrapper}>
        {/* <div className={styles.container}> */}
          <ul className={styles.carsList}>
            <CurrentCarsItem />
          </ul>
        {/* </div> */}
      </div>
    </div>
  );
}
