export const getStatusDetails = (styles, status, icon) => {
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
    case "diagnostic":
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
    case "view_repair":
      return {
        icon,
        label: "огляд пр",
        className: styles.viewRepairStatus,
      };
    default:
      return {
        icon: null,
        label: "невідомо",
        className: styles.unknownStatus,
      };
  }
};
