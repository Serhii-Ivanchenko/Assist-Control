import styles from "./Popup.module.css";

function Popup({ isOpen, onClose, children, positionClass, popupRef }) {
  if (!isOpen) return null;

  return (
    <div className={`${styles.popup} ${positionClass}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content} ref={popupRef}>
        {children}
      </div>
    </div>
  );
}

export default Popup;
