export const calculateTimeInService = (date_s, date_e) => {
  const startDate = new Date(date_s);
  const endDate = new Date(date_e);
  const differenceInMilliseconds = endDate - startDate;

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${days} днів ${hours} годин ${minutes} хвилин`;
};
