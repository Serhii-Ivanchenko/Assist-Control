import styles from "./Popup.module.css";

function Popup({ isOpen, onClose, children, positionClass }) {
  if (!isOpen) return null;

  return (
    <div className={`${styles.popup} ${positionClass}`}>
      <div className={styles.content} onClick={onClose}>
        {children}
      </div>
    </div>
  );
}

export default Popup;
