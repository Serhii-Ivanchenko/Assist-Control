import { useState } from "react";
import styles from "./OptionList.module.css";

function Option({ icon, isActive, label }) {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = (e) => {
    setIsTooltipVisible(true);
    updateTooltipPosition(e);
  };

  const handleMouseMove = (e) => {
    updateTooltipPosition(e);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const updateTooltipPosition = (e) => {
    setTooltipPosition({
      x: e.clientX + 10, // Зміщення тултіпу від курсора по X
      y: e.clientY + 10, // Зміщення тултіпу від курсора по Y
    });
  };

  return (
    <div
      className={styles.option}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className={isActive ? styles.activeIcon : styles.inactiveIcon}>
        {icon}
      </span>
      {isTooltipVisible && (
        <div
          className={styles.tooltip}
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default Option;
