import { BsWrench, BsUiChecksGrid, BsExclamationCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { PiEyeFill } from "react-icons/pi";

import clsx from "clsx";

const renderStatus = (status, complete_d, styles = {}) => {
  let icon;
  let statusText;
  let statusClass = "";
  let background;
  let borderColor;

  // Визначення фону та кольору рамки
  if (status === "new") {
    statusClass = styles.new || "";
    statusText = "нова";
    background = "var(--status-gradient-new)";
    borderColor = "var(--glow-new)";
  } else if (status === "repair") {
    statusClass = styles.repair || "";
    statusText = "ремонт";
    background = "var(--status-gradient-repair)";
    borderColor = "var(--glow-repair)"; 
  } else if (status === "check_repair") {
    statusClass = styles.checkRepair || "";
    statusText = "діагностика";
    background = "var(--status-gradient-diag)";
    borderColor = "var(--glow-diag)"; 
  } else if (status === "view_repair") {
    statusClass = styles.viewRepair || "";
    statusText = "огляд пр";
    background = "var(--status-gradient-view-repair)";
    borderColor = "var(--glow-view-repair)"; 
  } else if (status === "complete" || complete_d) {
    statusClass = styles.completed || "";
    statusText = "завершено";
    background = "var(--status-gradient-complete)";
    borderColor = "var(--glow-complete)";
  }  else {
    statusText = "уточнення";
  }

  // Визначення іконки
  switch (status) {
    case "new":
      icon = (
        <BsExclamationCircle 
          className={clsx(styles.icon, statusClass)}
          color="var(--light-gray)"
        />
      );
      break;
      case "view_repair":
      icon = (
        <PiEyeFill 
          className={clsx(styles.icon, statusClass)}
          color="var(--light-gray)"
        />
      );
      break;
    case "repair":
      icon = (
        <BsWrench
          className={clsx(styles.icon, statusClass)}
          color="var(--light-gray)"
        />
      );
      break;
    case "check_repair":
      icon = (
        <BsUiChecksGrid
          className={clsx(styles.icon, statusClass)}
          color="var(--light-gray)"
        />
      );
      break;
    case "complete":
    case complete_d:
      icon = (
        <AiFillCheckCircle
          className={clsx(styles.icon, statusClass, styles.iconComplete)}
          color="var(--light-gray)"
        />
      );
      break;
    default:
      icon = null;
  }

  return (
    <div
      className={clsx(styles.title, statusClass)}
      style={{
        borderRadius: "5px",
        borderLeft: `2px solid ${borderColor}`,
        background: background,
        "--glow-color": borderColor,
      }}
    >
      {icon}
      <span className={clsx(styles.statusText, statusClass)}>
        {statusText}
      </span>
    </div>
  );
};

export default renderStatus;
