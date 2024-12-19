import { useState } from "react";
import clsx from "clsx";
import styles from "./RangeTimeSelector.module.css";

export default function RangeTimeSelector({onSelectTimeRange}) {
  const [selected, setSelected] = useState(null);

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
    </div>
  );
}
