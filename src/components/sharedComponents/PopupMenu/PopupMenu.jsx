import { BsPencil, BsTrash } from "react-icons/bs";
import styles from "./PopupMenu.module.css";
import { useEffect, useRef } from "react";

function PopupMenu({ isOpen, onClose, onEdit, onAdd, onDelete }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ul className={styles.popup} ref={popupRef}>
      {onEdit && (
        <li>
          <button className={styles.editBtn} onClick={onEdit}>
            <BsPencil size={18} /> Редагувати
          </button>
        </li>
      )}
      {onAdd && (
        <li>
          <button className={styles.addBtn} onClick={onAdd}>
            Додати послугу
          </button>
        </li>
      )}
      {onDelete && (
        <li>
          <button className={styles.deleteBtn} onClick={onDelete}>
            <BsTrash size={18} /> Видалити
          </button>
        </li>
      )}
    </ul>
  );
}

export default PopupMenu;
