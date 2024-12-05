import { useState } from "react";
import styles from "./StatusToggle.module.css";

function StatusToggle() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.toggleBox}>
      <p className={styles.statusToggle}>
        {isActive ? "Активний" : "Неактивний"}
      </p>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive((prev) => !prev)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export default StatusToggle;
