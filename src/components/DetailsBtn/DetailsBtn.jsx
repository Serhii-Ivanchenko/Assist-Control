import styles from './DetailsBtn.module.css';
import { IoCarSportSharp } from "react-icons/io5";

export default function DetailsBtn({ onClick }) {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={onClick}>
      <p className={styles.btntext}>Всі авто</p><span> <IoCarSportSharp className={styles.iconAvto}/></span>
      </button>
    </div>
  );
}
