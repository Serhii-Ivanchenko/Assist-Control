import { BsWrench, BsUiChecksGrid, BsExclamationCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCarSportSharp } from "react-icons/io5";
import clsx from "clsx";
import { IoIosCloseCircle } from "react-icons/io";

const renderStatusCommunication = (status, styles = {}, isFilter) => {
  let icon;
  let statusText;
  let statusClass = "";
  let background;
  let borderColor;

  if (status === "all_appeal") {
    statusClass = styles.all || "";
    statusText = "ВСІ";
    background = "var(--status-gradient-all-calls)";
    borderColor = "var(--glow-all-calls)";
    icon = (
      <IoCarSportSharp
        className={clsx(styles.icon, statusClass)}
        color="var(--light-gray)"
      />
    );
  } else if (status === "new_appeal") {
    statusClass = styles.new || "";
    statusText = isFilter ? "НОВІ" : "НОВА";
    background = "var(--status-gradient-new)";
    borderColor = "var(--glow-new)";
  } else if (status === "client") {
    statusClass = styles.repair || "";
    statusText = "КЛІЄНТИ";
    background = "var(--status-gradient-repair)";
    borderColor = "var(--glow-repair)";
  } else if (status === "missing") {
    statusClass = styles.viewRepair || "";
    statusText = "ВТРАЧЕНО";
    background = "var(--status-gradient-view-repair)";
    borderColor = "var(--glow-view-repair)";
  } else if (status === "appointment") {
    statusClass = styles.completed || "";
    statusText = "ЗАПИС";
    background = "var(--status-gradient-complete)";
    borderColor = "var(--glow-complete)";
  } else {
    statusText = "УТОЧНЕННЯ";
  }

  if (!icon) {
    switch (status) {
      case "new_appeal":
        icon = (
          <BsExclamationCircle 
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        break;
      case "missing":
        icon = (
          <IoIosCloseCircle  
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        break;
      case "client":
        icon = (
          <BsWrench
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        break;
      case "diagnostic":
        icon = (
          <BsUiChecksGrid
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        break;
      case "appointment":
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

export default renderStatusCommunication;
