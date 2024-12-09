import { useState } from "react";
import clsx from "clsx";
import styles from "./RangeTimeSelector.module.css";

export default function RangeTimeSelector({
  timeData = [],
  onSelectTimeRange,
}) {
  const [selected, setSelected] = useState(0);

  const options = ["За день", "За тиждень", "За місяць", "Весь час"];

  const handleClick = (index) => {
    setSelected(index);
    if (onSelectTimeRange) onSelectTimeRange(index);
  };

  return (
    <div className={styles.wrapper}>
      {options.map((option, index) => (
        <div
          key={index}
          className={clsx(styles.timeContainer, {
            [styles.active]: index === selected,
          })}
          onClick={() => handleClick(index)}
        >
          <p className={styles.timeText}>{option}</p>
        </div>
      ))}

      {timeData.length > 0 && timeData[selected] && (
        <div className={styles.timeData}>
          <p>{timeData[selected]}</p>
        </div>
      )}
    </div>
  );
}
