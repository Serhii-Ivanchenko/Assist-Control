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
    ? `${days} д ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
