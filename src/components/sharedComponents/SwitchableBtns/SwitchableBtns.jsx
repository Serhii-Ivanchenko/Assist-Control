import clsx from "clsx";
import { BsPencil, BsPower, BsTrash } from "react-icons/bs";
import styles from "./SwitchableBtns.module.css";
import { RiSave3Fill } from "react-icons/ri";

function SwitchableBtns({
  isDisabled,
  onEdit,
  onDelete,
  onToggleDisable,
  isEditing,
  id,
  showIconSave,
}) {
  return (
    <div className={styles.btnsBox}>
      {showIconSave && isEditing === id ? (
        <RiSave3Fill className={styles.btn} onClick={onEdit} />
      ) : (
        <BsPencil className={styles.btn} onClick={onEdit} />
      )}
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
