import { useState, useEffect } from "react";
import styles from "./StatusToggle.module.css";

function StatusToggle({ isDisabled, onToggleDisable }) {
  const [isActive, setIsActive] = useState(!isDisabled);

  useEffect(() => {
    setIsActive(!isDisabled);
  }, [isDisabled]);

  return (
    <div className={styles.toggleBox}>
      <p className={styles.statusToggle}>
        {isActive ? "Активний" : "Неактивний"}
      </p>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => onToggleDisable()}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export default StatusToggle;
