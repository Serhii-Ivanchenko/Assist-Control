export const renderTime = (complete_d, date_s) => {
  const startDate = new Date(date_s);
  const endDate = complete_d ? new Date(complete_d) : new Date();
  const differenceInMilliseconds = endDate - startDate;

  const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Для відображення дати запису в CRM

export const formatDateTime = (dateString, timeString) => {
  try {
    const date = new Date(`${dateString}T${timeString}`);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date or time format");
    }
    const formattedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      // year: '2-digit',
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
  if (!date_s) {
    console.error('Date is not provided');
    return 'Уточнення';
  }
  
  const startDate = new Date(date_s);
  
  if (isNaN(startDate.getTime())) {
    console.error('Invalid date:', date_s);
    return 'Invalid Date';
  }

  const endDate = Date.now();
  const differenceInMilliseconds = endDate - startDate;

  if (isNaN(differenceInMilliseconds)) {
    console.error('Invalid difference in milliseconds:', differenceInMilliseconds);
    return 'Invalid Time Difference';
  }

  const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return days > 0
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};