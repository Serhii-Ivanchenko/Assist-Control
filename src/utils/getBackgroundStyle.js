export const getBackgroundStyle = (status) => {
    switch (status) {
      case "new":
        return {
          background:
            "linear-gradient(#2D3038, #2D3038) padding-box, var(--border-gradient-new) border-box",
        };
      case "diagnostic":
        return {
          background:
            "linear-gradient(#2D3038, #2D3038) padding-box, var(--border-gradient-diag) border-box",
        };
      case "repair":
        return {
          background:
            "linear-gradient(#2D3038, #2D3038) padding-box, var(--border-gradient-repair) border-box",
        };
      case "complete":
        return {
          background:
            "linear-gradient(#2D3038, #2D3038) padding-box, var(--border-gradient-complete) border-box",
        };
      default:
        return {};
    }
  };