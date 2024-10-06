import CurrentCarsItem from "../CurrentCarsItem/CurrentCarsItem.jsx";
import styles from "./CurrentCarsList.module.css";

export default function CurrentCarsList() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.carsList}>
        <CurrentCarsItem />
        <CurrentCarsItem />
        <CurrentCarsItem />
      </ul>
    </div>
  );
}
