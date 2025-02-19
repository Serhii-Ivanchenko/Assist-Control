import React from "react";
import clsx from "clsx";
import styles from "./StepperBtn.module.css";

const StepperBtn = React.forwardRef((props, ref) => {
  const {
    value,
    icon,
    extraIcon,
    isActive,
    noBackground,
    notificationSent,
    status,
  } = props;
  const iconColor = clsx(styles.icon, {
    [styles.active]: isActive,
    [styles.inactive]: !isActive,
    [styles.noBackground]: noBackground,
    [styles.notificationSent]: notificationSent,
    [styles.notificationDelay]: status === "complete" && !notificationSent,
  });

  if (React.isValidElement(icon) && icon.type === "img") {
    return (
      <div className={styles.wrapperImg}>
        <p className={styles.textImg}>{value}</p>
        <span>{icon}</span>
      </div>
    );
  }
  return (
    <div ref={ref} className={styles.wrapper}>
      <p className={styles.text}>{value}</p>
      <span className={iconColor}>{icon}</span>
      {extraIcon ? <span className={styles.extraIcon}>{extraIcon}</span> : null}
    </div>
  );
});

StepperBtn.displayName = "StepperBtn";

export default StepperBtn;
