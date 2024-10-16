import styles from "../components/CurrentCarsItem/CurrentCarsItem.module.css";

export const getStatusDetails = (status, icon) => {
  switch (status) {
    case "new":
      return {
        icon,
        label: "нова",
        className: styles.newStatus,
      };
    case "repair":
      return {
        icon,
        label: "ремонт",
        className: styles.repairStatus,
      };
    case "check_repair":
      return {
        icon,
        label: "діагностика",
        className: styles.checkRepairStatus,
      };
    case "complete":
      return {
        icon,
        label: "завершено",
        className: styles.completeStatus,
      };
    default:
      return {
        icon: null,
        label: "невідомо",
        className: styles.unknownStatus,
      };
  }
};
