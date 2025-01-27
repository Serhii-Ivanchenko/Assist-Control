import clsx from "clsx";
import { BsPencil, BsPower, BsTrash } from "react-icons/bs";
import styles from "./SwitchableBtns.module.css";
import { RiSave3Fill } from "react-icons/ri";
import { BsXCircle } from "react-icons/bs";
import Modal from "../../Modals/Modal/Modal";
import { useState } from "react";
import DeleteModal from "./DeleteModal/DeleteModal";

function SwitchableBtns({
  isDisabled,
  onEdit,
  onSave,
  onDelete,
  onToggleDisable,
  isEditing,
  id,
  showIconSave,
  onRepeal,
  text,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.btnsBox}>
      {showIconSave && isEditing === id ? (
        <>
          <BsXCircle className={styles.btn} onClick={onRepeal} />
          <RiSave3Fill
            className={styles.btn}
            onClick={onSave}
            style={{ transform: "scale(1.32)" }}
          />
        </>
      ) : (
        <BsPencil className={styles.btn} onClick={onEdit} />
      )}

      <BsTrash
        className={`${styles.btn} ${styles.btnTrash}`}
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <DeleteModal
            onClose={() => setOpenModal(false)}
            text={text}
            onDelete={onDelete}
          />
        </Modal>
      )}
      <BsPower
        className={clsx(styles.btn, {
          [styles.active]: isDisabled === 1,
          [styles.disabled]: isDisabled === 0,
        })}
        onClick={onToggleDisable}
      />
    </div>
  );
}

export default SwitchableBtns;
