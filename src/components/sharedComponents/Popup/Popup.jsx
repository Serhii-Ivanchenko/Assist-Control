import { useEffect, useRef } from "react";
import styles from "./Popup.module.css";

function Popup({ isOpen, onClose, children }) {
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
    <div className={styles.popup}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content} ref={popupRef}>
        {children}
      </div>
    </div>
  );
}

export default Popup;
