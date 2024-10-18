import { calculateTimeInService } from "./calculateTimeInService.js";

export const renderTime = (complete_d, date_s) => {
    if (complete_d) {
      const completeDate = new Date(complete_d);
      const startDate = new Date(date_s);
      const differenceInMilliseconds = completeDate - startDate;
  
      const hours = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (differenceInMilliseconds % (1000 * 60)) / 1000
      );
  
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      return calculateTimeInService(date_s, new Date().toISOString());
    }
  };
  