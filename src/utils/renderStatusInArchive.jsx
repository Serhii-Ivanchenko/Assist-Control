import {  BsUiChecksGrid } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import clsx from "clsx";
import { IoIosCloseCircle } from "react-icons/io";

const renderStatusInArchive = (reason_description, styles = {}) => {
  let icon;
  let statusText = "";
  let statusClass = "";
  let background;
  let borderColor;

  if (reason_description === "all") {
    statusClass = styles.all || "";
    statusText = "ВСІ АВТО";
    background = "var(--status-gradient-all-calls)";
    borderColor = "var(--glow-all-calls)";
    icon = (
      <IoCarSportSharp
        className={clsx(styles.icon, statusClass)}
        color="var(--light-gray)"
      />
    );
  } else if (reason_description === "співробітник") {
    statusClass = styles.lighBlue || "";
    statusText = "СПІВРОБІТНИК";
    background = "var(--status-gradient-archive-light-blue)";
    borderColor = "var(--glow-archive-light-blue)";
  } else if (reason_description === "рекомендації") {
    statusClass = styles.lighBlue || "";
    statusText = "РЕКОМЕНДАЦІЇ";
    background = "var(--status-gradient-archive-light-blue)";
    borderColor = "var(--glow-archive-light-blue)";
  } else if (reason_description === "випадковий") {
    statusClass = styles.lighBlue || "";
    statusText = "ВИПАДКОВИЙ";
    background = "var(--status-gradient-archive-light-blue)";
    borderColor = "var(--glow-archive-light-blue)";
  } else if (reason_description === "дубль") {
    statusClass = styles.checkRepair || "";
    statusText = "ДУБЛЬ";
    background = "var(--status-gradient-diag)";
    borderColor = "var(--glow-diag)";
  } else if (reason_description === "відмова") {
    statusClass = styles.violet || "";
    statusText = "ВІДМОВА";
    background = "var(--status-gradient-archive-violet)";
    borderColor = "var(--glow-archive-violet)";
  } else if (reason_description === "не_приїхав") {
    statusClass = styles.violet || "";
    statusText = "НЕ ПРИЇХАВ";
    background = "var(--status-gradient-archive-violet)";
    borderColor = "var(--glow-archive-violet)";
  } else if (reason_description === "рейтинг") {
    statusClass = styles.violet || "";
    statusText = "РЕЙТИНГ";
    background = "var(--status-gradient-archive-violet)";
    borderColor = "var(--glow-archive-violet)";
  } else if (reason_description === "не_допомогли") {
    statusClass = styles.red || "";
    statusText = "НЕ ДОПОМОГЛИ";
    background = "var(--status-gradient-view-repair)";
    borderColor = "var(--glow-view-repair)";
  } else {
    statusText = "УТОЧНЕННЯ";
  }

  if (!icon) {
    switch (reason_description) {
      case "співробітник":
      case "випадковий":
      case "рекомендації":
      case "відмова":
      case "не_приїхав":
      case "рейтинг":
      case "не_допомогли":
        icon = (
          <IoIosCloseCircle
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
          />
        );
        break;
      case "дубль":
        icon = (
          <BsUiChecksGrid
            className={clsx(styles.icon, statusClass)}
            color="var(--light-gray)"
            size={13}
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


export default renderStatusInArchive;
