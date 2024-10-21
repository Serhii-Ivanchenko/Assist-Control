export const renderTime = (complete_d, date_s) => {
  const startDate = new Date(date_s);
  const endDate = complete_d ? new Date(complete_d) : new Date();
  const differenceInMilliseconds = endDate - startDate;

  const totalHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  const hours = complete_d ? Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : totalHours;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
