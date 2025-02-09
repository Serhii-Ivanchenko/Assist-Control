import { useState } from "react";
import clsx from "clsx";
import styles from "./RangeTimeSelector.module.css";

export default function RangeTimeSelector({ onSelectTimeRange }) {
  const [selected, setSelected] = useState(null);

  const options = [
    { label: "За день", value: "day" },
    { label: "За тиждень", value: "week" },
    { label: "За місяць", value: "month" },
    { label: "Весь час", value: "all" }
  ];

  const handleClick = (index) => {
    setSelected(index);
    if (onSelectTimeRange) {
      onSelectTimeRange(options[index].value);
    }
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
          <p className={styles.timeText}>{option.label}</p>
        </div>
      ))}
    </div>
  );
}
