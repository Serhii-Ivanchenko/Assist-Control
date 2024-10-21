import { BsWrench, BsUiChecksGrid, BsExclamationCircle } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
    borderColor = "#F5DD23"; // колір для "new"
  } else if (status === "repair") {
    statusClass = styles.repair || "";
    statusText = "ремонт";
    background = "var(--status-gradient-repair)";
    borderColor = "#CF25C4"; // колір для "repair"
  } else if (status === "check_repair") {
    statusClass = styles.checkRepair || "";
    statusText = "діагностика";
    background = "var(--status-gradient-diag)";
    borderColor = "#256FCF"; // колір для "check_repair"
  } else if (status === "complete" || complete_d) {
    statusClass = styles.completed || "";
    statusText = "завершено";
    background = "var(--status-gradient-complete)";
    borderColor = "#41CF25"; // колір для "complete"
  } else {
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
        <AiOutlineCheckCircle
          className={clsx(styles.icon, statusClass, styles.iconComplete)}
        />
      );
      break;
    default:
      icon = null;
  }

  return (
    <div
      className={clsx(styles.title || "")}
      style={{
        borderRadius: "5px",
        borderLeft: `1px solid ${borderColor}`, 
        background: background,
      }}
    >
      {icon}
      <span className={clsx(styles.statusText || "", statusClass)}>
        {statusText}
      </span>
    </div>
  );
};

export default renderStatus;
