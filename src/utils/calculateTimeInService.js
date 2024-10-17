export const calculateTimeInService = (date_s) => {
  const startDate = new Date(date_s);
  const endDate = new Date();
  const differenceInMilliseconds = endDate - startDate;

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  return `${days} дні ${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
