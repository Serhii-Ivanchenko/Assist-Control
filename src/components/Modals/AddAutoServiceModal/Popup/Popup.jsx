import { BsTrash } from "react-icons/bs";
import css from "./Popup.module.css";
import { useEffect, useRef } from "react";

export default function Popup({ isOpen, onClose, buttonRef, onDelete }) {
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

  if (!isOpen) return null;

  return (
    <p className={css.deleteBtn} onClick={onDelete} ref={popupRef}>
      <BsTrash size={18} /> Видалити сервіс
    </p>
  );
}
