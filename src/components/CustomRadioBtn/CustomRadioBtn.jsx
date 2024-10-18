import { BsRecord2, BsRecord } from "react-icons/bs";
import styles from "./CustomRadioBtn.module.css";

function CustomRadioBtn({ isChecked }) {
  return isChecked ? (
    <BsRecord2 className={styles.icon} />
  ) : (
    <BsRecord className={styles.icon} />
  );
}

export default CustomRadioBtn;
