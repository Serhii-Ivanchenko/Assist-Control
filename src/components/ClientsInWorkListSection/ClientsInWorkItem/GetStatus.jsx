import { BsWrench, BsUiChecksGrid, BsExclamationCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./ClientsInWorkItem.module.css";

function GetStatus({ status }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return {
          background:
            "linear-gradient(245deg, #F5DD23 3.09%, #2B2C2C 33.25%, #23252C 62.48%, #DBC624 97.56%)",
          icon: (
            <BsExclamationCircle
              color="var(--light-gray)"
              style={{ transform: "scale(1.5)" }}
            />
          ),
        };
      case "diagnostic":
        return {
          background: "var(--status-gradient-diag)",
          icon: (
            <BsUiChecksGrid
              color="var(--light-gray)"
              style={{ transform: "scale(1.5)" }}
            />
          ),
        };
      case "repair":
        return {
          background:
            "linear-gradient(241deg, #994CA5 7.9%, #2B2C2C 38.54%, #23252C 62.58%, #994CA5 92.6%)",
          icon: (
            <BsWrench
              color="var(--light-gray)"
              style={{ transform: "scale(1.5)" }}
            />
          ),
        };
      case "complete":
        return {
          background:
            "linear-gradient(245deg, #23F523 3.09%, #2B2C2C 33.25%, #23252C 62.48%, #25C125 97.56%)",
          icon: (
            <AiFillCheckCircle
              color="var(--light-gray)"
              style={{ transform: "scale(1.5)" }}
            />
          ),
        };
      default:
        return {
          background: "var(--status-gradient-default)",
          icon: null,
        };
    }
  };

  const { background, icon } = getStatusStyle(status);
  return (
    <div className={styles.statusContainer} style={{ background }}>
      {icon}
    </div>
  );
}

export default GetStatus;
