import { BsWrench, BsLayerBackward } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import clsx from "clsx";

const renderStatus = (status, complete_d, styles) => {
  let icon;
  let statusText;
  let statusClass = "";

  if (status === "new" || status === "repair" || status === "check_repair") {
    switch (status) {
      case "new":
        icon = (
          <HiOutlineHashtag
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        statusText = "нова";
        statusClass = styles.new;
        break;
      case "repair":
        icon = (
          <BsWrench
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        statusText = "ремонт";
        statusClass = styles.repair;
        break;
      case "check_repair":
        icon = (
          <BsLayerBackward
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        statusText = "діагностика";
        statusClass = styles.checkRepair;
        break;
      default:
        icon = null;
        statusText = "Невідомий статус";
    }
  } else if (status === "complete" || complete_d) {
    icon = (
      <AiOutlineCheckCircle
        className={clsx(styles.icon, statusClass)}
        color="#4CAF50"
      />
    );
    statusText = "завершено";
    statusClass = styles.completed;
  } else {
    icon = null;
    statusText = "Невідомий статус";
  }

  return (
    <div
      className={clsx(styles.title)}
      style={{
        borderColor: statusClass.includes("completed")
          ? "var(--light-gray)"
          : statusClass.includes("new")
          ? "var(--status-new)"
          : statusClass.includes("repair")
          ? "#994CA5"
          : statusClass.includes("checkRepair")
          ? "var(--blue)"
          : "var(--black)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {icon}
      <span className={clsx(styles.statusText, statusClass)}>{statusText}</span>
    </div>
  );
};

export default renderStatus;