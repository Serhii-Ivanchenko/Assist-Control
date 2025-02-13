import styles from "./RecievedPartsPopup.module.css";
import { useEffect, useRef } from "react";

export default function RecievedPartsPopup({ isOpen, onClose, buttonRef }) {
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

  useEffect(() => {
    console.log("RecievedPartsPopup mounted", isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper} ref={popupRef}>
      <ul className={styles.popup}>
        <li>Запчастина 1</li>
        <li>Запчастина 2</li>
        <li>Запчастина 3</li>
        <li>Запчастина 4</li>
      </ul>
    </div>
  );
}
