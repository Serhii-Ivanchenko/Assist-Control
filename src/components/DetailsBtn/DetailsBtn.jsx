import styles from "./DetailsBtn.module.css";
import { IoCarSportSharp } from "react-icons/io5";

export default function DetailsBtn({ onClick }) {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={onClick}>
        Всі авто
        <IoCarSportSharp className={styles.iconAvto} />
      </button>
    </div>
  );
}
