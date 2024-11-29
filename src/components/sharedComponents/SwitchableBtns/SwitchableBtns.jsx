import clsx from "clsx";
import { BsPencil, BsPower, BsTrash } from "react-icons/bs";
import styles from "./SwitchableBtns.module.css";

function SwitchableBtns({ isDisabled, onEdit, onDelete, onToggleDisable }) {
  return (
    <div className={styles.btnsBox}>
      <BsPencil className={styles.btn} onClick={onEdit} />
      <BsTrash className={styles.btn} onClick={onDelete} />
      <BsPower
        className={clsx(styles.btn, {
          [styles.active]: !isDisabled,
          [styles.disabled]: isDisabled,
        })}
        onClick={onToggleDisable}
      />
    </div>
  );
}

export default SwitchableBtns;
