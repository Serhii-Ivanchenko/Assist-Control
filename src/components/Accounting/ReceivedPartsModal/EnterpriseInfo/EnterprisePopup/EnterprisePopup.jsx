import { useEffect, useRef } from "react";
import styles from "./EnterprisePopup.module.css";

function EnterprisePopup({ isOpen, onClose, options, buttonRef, onSelect }) {
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
    <div className={styles.wrapper} ref={popupRef}>
      <ul className={styles.settingsList}>
        {options.map((option, index) => (
          <li key={index}>
            <button
              className={styles.settingsBtn}
              onClick={() => {
                onClose();
                onSelect(option);
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnterprisePopup;
