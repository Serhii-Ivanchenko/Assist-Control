import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./ServiceItem.module.css";

function ServiceItem({ id, serviceData, onUpdate, onDelete }) {
  const [serviceName, setServiceName] = useState(serviceData.item);
  const [isEdit, setIsEdit] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);
  const inputRef = useRef();

  const handlePopupToggle = () => {
    setActivePopupId((prev) => (prev === id ? null : id));
  };

  const handleEdit = () => {
    setIsEdit(true);
    setActivePopupId(null);
  };

  const handleSave = () => {
    setIsEdit(false);
    onUpdate({ id, name: serviceName });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      {isEdit ? (
        <div className={styles.editInputBox}>
          <input
            className={styles.editInput}
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            onBlur={handleSave}
            ref={inputRef}
          />
        </div>
      ) : (
        <div className={styles.inputBox}>
          <p className={styles.text}>{serviceName}</p>
        </div>
      )}

      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Мін</label>
          <input placeholder="250" className={styles.input} />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Макс</label>
          <input placeholder="400" className={styles.input} />
        </div>
      </div>

      <button className={styles.btnInput} onClick={handlePopupToggle}>
        <BsThreeDotsVertical className={styles.dotsIcon} />
      </button>

      {activePopupId === id && (
        <div className={styles.popupContainer}>
          <PopupMenu
            isOpen={true}
            onClose={handlePopupToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </>
  );
}

export default ServiceItem;
