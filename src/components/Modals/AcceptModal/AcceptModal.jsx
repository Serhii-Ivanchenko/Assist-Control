import { IoIosClose } from "react-icons/io";
import styles from "./AcceptModal.module.css";

const AcceptModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <button className={styles.exitBtn} onClick={onCancel}>
        <IoIosClose className={styles.icon} />
      </button>
      <p className={styles.text}>
        Ви впевнені, що хочете завершити ремонт авто? Після цього його повернути
        неможливо.
      </p>
      <div className={styles.buttons}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Скасувати
        </button>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          Підтвердити
        </button>
      </div>
    </div>
  );
};

export default AcceptModal;
