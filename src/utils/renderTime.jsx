import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";


export const renderTime = (complete_d, date_s) => {
  const startDate = new Date(date_s);
  const endDate = complete_d ? new Date(complete_d) : new Date();

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid Date";
  }

  const days = differenceInDays(endDate, startDate);
  const hours = differenceInHours(endDate, startDate) % 24;
  const minutes = differenceInMinutes(endDate, startDate) % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Для відображення дати запису в CRM

export const formatDateTime = (dateString, timeString) => {
  try {
    console.log("Received dateString:", dateString);  
    console.log("Received timeString:", timeString);  
    
    // Забезпечення формату часу HH:mm
    const formattedTimeString = String(timeString).padStart(2, "0") + ":00";

    // Створення об'єкта дати у форматі ISO 8601
    const date = new Date(`${dateString}T${formattedTimeString}+02:00`);  // UTC+2

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date or time format");
    }

    const formattedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <span style={{ margin: 0 }}>
        <span style={{ borderRight: "1px solid #ccc", paddingRight: "4px" }}>
          {formattedDate}
        </span>
        <span style={{ paddingLeft: "4px" }}>{formattedTime}</span>
      </span>
    );
  } catch (error) {
    console.error("Error formatting date/time:", error);
    return "Invalid date/time";
  }
};


// Для відображення дати машини в роботі у CRM у форматі Хд ХХ:ХХ

export const renderTimeinWork = (date_s) => {
  if (!date_s) return "Уточнення";

  const startDate = new Date(date_s);
  const now = new Date();

  if (isNaN(startDate.getTime())) return "Invalid Date";

  const days = differenceInDays(now, startDate);
  const hours = differenceInHours(now, startDate) % 24;
  const minutes = differenceInMinutes(now, startDate) % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
