import { BsUiChecksGrid } from "react-icons/bs";
import clsx from "clsx";

const STATUS_CONFIG = {
  "ХОДОВА": { text: "ХОДОВА" },
  "ТО": { text: "ТО" },
  "АКЦІЯ RENAULT": { text: "АКЦІЯ RENAULT" },
  "СЕЗОННА АКЦІЯ": { text: "СЕЗОННА АКЦІЯ" },
  "АКЦІЯ FORD": { text: "АКЦІЯ FORD" }
};

const COMMON_STYLES = {
  borderRadius: "5px",
  borderLeft: "2px solid var(--glow-diag)",
  background: "var(--status-gradient-diag)",
  "--glow-color": "var(--glow-diag)"
};

const renderStatusRecomendations = (status, styles = {}) => {
  const config = STATUS_CONFIG[status] || { text: "УТОЧНЕННЯ" };
  
  return (
    <div
      className={clsx(styles.title, styles.checkRepair)}
      style={COMMON_STYLES}
    >
      <BsUiChecksGrid
        className={clsx(styles.icon, styles.checkRepair)}
        color="var(--light-gray)"
      />
      <span className={clsx(styles.statusText, styles.checkRepair)}>
        {config.text}
      </span>
    </div>
  );
};

export default renderStatusRecomendations;
