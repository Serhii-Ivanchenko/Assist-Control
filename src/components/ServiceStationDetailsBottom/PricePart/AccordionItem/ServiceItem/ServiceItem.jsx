import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./ServiceItem.module.css";

function ServiceItem({
  isEdit,
  serviceData,
  idx,
  onDelete,
  onUpdate,
  onEnableEditing,
}) {
  const [serviceName, setServiceName] = useState(serviceData.item);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const inputRef = useRef();

  const handlePopupToggle = (idx) => {
    setOpenPopupIndex((prev) => (prev === idx ? null : idx));
  };

  const handleServiceEdit = () => {
    onEnableEditing((prev) => (prev === idx ? null : idx));
  };

  const handleSave = () => {
    onUpdate({ ...serviceData, item: serviceName });
  };

  const handleDelete = () => {
    setOpenPopupIndex(null);
    onDelete();
  };
  return (
    <li key={idx}>
      {isEdit ? (
        <div className={styles.editInputBox}>
          <input
            className={styles.editInput}
            type="text"
            value={serviceName}
            onChange={(e) => {
              const newValue = e.target.value;
              setServiceName(newValue);
              onUpdate(handleSave);
            }}
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

      <button
        className={styles.btnInput}
        onClick={(e) => handlePopupToggle(idx, e)}
      >
        <BsThreeDotsVertical className={styles.dotsIcon} />
      </button>

      {openPopupIndex === idx && (
        <div className={styles.popupContainer}>
          <div className={styles.popupMenu}>
            <PopupMenu
              isOpen={openPopupIndex === idx}
              onClose={(e) => handlePopupToggle(idx, e)}
              onEdit={(e) => handleServiceEdit(idx, e)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </li>
  );
}

export default ServiceItem;
