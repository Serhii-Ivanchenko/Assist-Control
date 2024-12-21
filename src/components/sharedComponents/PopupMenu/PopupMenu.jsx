import { BsPencil, BsTrash } from "react-icons/bs";
import { RiTableAltLine } from "react-icons/ri";
import styles from "./PopupMenu.module.css";
import { useEffect, useRef } from "react";

function PopupMenu({
  isOpen,
  onClose,
  onEdit,
  onAdd,
  onDelete,
  buttonRef,
  containerRef,
  innerAccRef,
}) {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Автоматичний скролл при відкритті останнього поповера (для категорій)
  useEffect(() => {
    if (isOpen && popupRef.current && containerRef.current) {
      const popover = popupRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const extraPadding = 5; // Додаткові пікселі для тіні

      if (popoverRect.bottom + extraPadding > containerRect.bottom) {
        container.scrollTo({
          top:
            container.scrollTop +
            (popoverRect.bottom - containerRect.bottom + extraPadding),
          behavior: "smooth",
        });
      }

      if (popoverRect.top - extraPadding < containerRect.top) {
        container.scrollTo({
          top:
            container.scrollTop -
            (containerRect.top - popoverRect.top + extraPadding),
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, containerRef]);

  // Автоматичний скролл при відкритті останнього поповера (для внутрянки акордіону)
  useEffect(() => {
    if (isOpen && popupRef.current && innerAccRef.current) {
      const popover = popupRef.current;
      const container = innerAccRef.current;

      const containerRect = container.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const extraPadding = 5; // Додаткові пікселі для тіні

      if (popoverRect.bottom + extraPadding > containerRect.bottom) {
        container.scrollTo({
          top:
            container.scrollTop +
            (popoverRect.bottom - containerRect.bottom + extraPadding),
          behavior: "smooth",
        });
      }

      if (popoverRect.top - extraPadding < containerRect.top) {
        container.scrollTo({
          top:
            container.scrollTop -
            (containerRect.top - popoverRect.top + extraPadding),
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, popupRef, innerAccRef]);

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
          <button className={styles.editBtn} onClick={onAdd}>
            <RiTableAltLine size={18} /> Додати послугу
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
